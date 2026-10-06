import express from 'express';
import Visitor from '../models/Visitor.js';

const router = express.Router();

// POST /api/visitors - Log a new visit
router.post('/', async (req, res) => {
  try {
    const { ip, city, region, country, browser, os } = req.body;
    
    // Provide a fallback if something is missing
    const newVisitor = new Visitor({
      ip: ip || req.ip || 'Unknown',
      city,
      region,
      country,
      browser,
      os
    });

    await newVisitor.save();
    res.status(201).json({ success: true, message: 'Visit logged successfully' });
  } catch (error) {
    console.error('Error logging visit:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// GET /api/visitors/stats - Get analytics data
router.get('/stats', async (req, res) => {
  try {
    const totalVisits = await Visitor.countDocuments();
    
    // Count unique IPs
    const uniqueVisitors = await Visitor.distinct('ip').then(ips => ips.length);
    
    // Get recent visits (last 50)
    const recentVisits = await Visitor.find()
      .sort({ visitDate: -1 })
      .limit(50);
      
    // Group by Country
    const locationStatsRaw = await Visitor.aggregate([
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    const locationStats = locationStatsRaw.map(stat => ({
      name: stat._id === 'Unknown' || !stat._id ? 'Unknown' : stat._id,
      value: stat.count
    }));

    // Group by Date for charting (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const timelineStatsRaw = await Visitor.aggregate([
      { 
        $match: { 
          visitDate: { $gte: sevenDaysAgo } 
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$visitDate" } },
          visits: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const timelineStats = timelineStatsRaw.map(stat => ({
      date: stat._id,
      visits: stat.visits
    }));

    res.json({
      success: true,
      stats: {
        totalVisits,
        uniqueVisitors,
        recentVisits,
        locationStats,
        timelineStats
      }
    });

  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;

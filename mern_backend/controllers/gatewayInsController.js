const GatewayIns = require('../models/GatewayIns');

// Create or update a gateway instance
const createOrUpdateGatewayIns = async (req, res) => {
  try {
    const { 
      id, 
      unique_id, 
      gateway_name, 
      parameter_details, 
      gateway_response, 
      payment_status, 
      amount, 
      currency, 
      transaction_id, 
      reference_id, 
      student_id, 
      admission_id, 
      course_id, 
      fee_type, 
      payment_mode, 
      description 
    } = req.body;

    if (id) {
      // Update existing gateway instance
      const updatedGateway = await GatewayIns.findByIdAndUpdate(
        id,
        { 
          unique_id, 
          gateway_name, 
          parameter_details, 
          gateway_response, 
          payment_status, 
          amount, 
          currency, 
          transaction_id, 
          reference_id, 
          student_id, 
          admission_id, 
          course_id, 
          fee_type, 
          payment_mode, 
          description,
          processed_at: payment_status === 'success' ? new Date() : null
        },
        { new: true, runValidators: true }
      );
      
      if (!updatedGateway) {
        return res.status(404).json({ message: 'Gateway instance not found' });
      }
      
      res.status(200).json(updatedGateway);
    } else {
      // Create new gateway instance
      const newGateway = new GatewayIns({ 
        unique_id, 
        gateway_name, 
        parameter_details, 
        gateway_response, 
        payment_status, 
        amount, 
        currency, 
        transaction_id, 
        reference_id, 
        student_id, 
        admission_id, 
        course_id, 
        fee_type, 
        payment_mode, 
        description 
      });
      const savedGateway = await newGateway.save();
      res.status(201).json(savedGateway);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get gateway instance by unique_id and gateway_name
const getGatewayIns = async (req, res) => {
  try {
    const { unique_id, gateway_name } = req.params;
    const gateway = await GatewayIns.findOne({ unique_id, gateway_name })
      .populate('student_id')
      .populate('admission_id')
      .populate('course_id');

    if (!gateway) {
      return res.status(404).json({ message: 'Gateway instance not found' });
    }

    res.status(200).json(gateway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all gateway instances
const getAllGatewayIns = async (req, res) => {
  try {
    const { gateway_name, payment_status, fee_type } = req.query;
    
    let query = {};
    if (gateway_name) query.gateway_name = gateway_name;
    if (payment_status) query.payment_status = payment_status;
    if (fee_type) query.fee_type = fee_type;

    const gateways = await GatewayIns.find(query)
      .populate('student_id')
      .populate('admission_id')
      .populate('course_id')
      .sort({ createdAt: -1 });

    res.status(200).json(gateways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get gateway instance by ID
const getGatewayInsById = async (req, res) => {
  try {
    const { id } = req.params;
    const gateway = await GatewayIns.findById(id)
      .populate('student_id')
      .populate('admission_id')
      .populate('course_id');

    if (!gateway) {
      return res.status(404).json({ message: 'Gateway instance not found' });
    }

    res.status(200).json(gateway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get gateway instances by gateway name
const getGatewayInsByName = async (req, res) => {
  try {
    const { gateway_name } = req.params;
    const gateways = await GatewayIns.find({ gateway_name })
      .populate('student_id')
      .populate('admission_id')
      .populate('course_id')
      .sort({ createdAt: -1 });

    res.status(200).json(gateways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { unique_id, gateway_name } = req.params;
    const { payment_status, gateway_response, transaction_id } = req.body;

    const updatedGateway = await GatewayIns.findOneAndUpdate(
      { unique_id, gateway_name },
      { 
        payment_status, 
        gateway_response, 
        transaction_id,
        processed_at: payment_status === 'success' ? new Date() : null
      },
      { new: true, runValidators: true }
    );

    if (!updatedGateway) {
      return res.status(404).json({ message: 'Gateway instance not found' });
    }

    res.status(200).json(updatedGateway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete gateway instance by ID
const deleteGatewayIns = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGateway = await GatewayIns.findByIdAndDelete(id);

    if (!deletedGateway) {
      return res.status(404).json({ message: 'Gateway instance not found' });
    }

    res.status(200).json({ message: 'Gateway instance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payment processing data
const getPaymentProcessing = async (req, res) => {
  try {
    const { gateway_ins_id } = req.params;
    const gateway = await GatewayIns.findById(gateway_ins_id)
      .populate('student_id')
      .populate('admission_id')
      .populate('course_id');

    if (!gateway) {
      return res.status(404).json({ message: 'Gateway instance not found' });
    }

    res.status(200).json(gateway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payment statistics
const getPaymentStats = async (req, res) => {
  try {
    const stats = await GatewayIns.aggregate([
      {
        $group: {
          _id: '$payment_status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const gatewayStats = await GatewayIns.aggregate([
      {
        $group: {
          _id: '$gateway_name',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    res.status(200).json({
      paymentStats: stats,
      gatewayStats: gatewayStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateGatewayIns,
  getGatewayIns,
  getAllGatewayIns,
  getGatewayInsById,
  getGatewayInsByName,
  updatePaymentStatus,
  deleteGatewayIns,
  getPaymentProcessing,
  getPaymentStats
};

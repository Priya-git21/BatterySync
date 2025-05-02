const logout = async (req, res, next) => {
    try {
      res
        .status(200)
        .json({ message: 'Logged out successfully', status: true });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = logout;
  
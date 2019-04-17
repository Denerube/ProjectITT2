/*jshint esversion: 6 */
module.exports = function (req, res, next) {
    //deze is apart van de rest omdat als er later de optie is om users te verwijderen dit enkel gedaan zal worden door iemand
    //die een admin is
    // 401 Unauthorized
    // 403 Forbidden 
    
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');
  
    next();
  }
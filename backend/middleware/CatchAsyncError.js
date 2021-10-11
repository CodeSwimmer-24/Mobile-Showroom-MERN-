module.exports = asyncFunctions => (req,res,next) => {
    Promise.resolve(asyncFunctions(req,res,next)).catch(next);
 }
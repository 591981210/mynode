const { validationResult } = require('express-validator/check')

module.exports = rules => {
  return [
    rules,
    (req, res, next) => { // 错误处理中间件
        console.log(111)
      const errors = validationResult(req)
        console.log(errors);
        console.log(errors.array());
        if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      next()
    }
  ]
}

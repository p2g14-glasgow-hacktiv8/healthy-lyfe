function error(err, req, res, next) {
   
    if (err) {
        switch (err.name) {
            case "SequelizeValidationError":
                let errors = err.errors.map(el => {
                    return {
                        message: el.message
                    }
                })
                res.status(400).json(errors)
            break

            case "notFound":
                res.status(404).json({message: "Errors not found"})
            break

            case "invalid":
                res.status(401).json({message: "Invalid email/password"})
            break

            case "Not Authenticated":
                res.status(401).json({message: "Please login first"})
            break

            case "Not Authorized":
                res.status(403).json({message: "No Authorization"})
            break

            default:
                console.log(err)
                res.status(500).json({message: "internal Server Error"})
            break
        }
    }
    //errorhandler
}

module.exports = error
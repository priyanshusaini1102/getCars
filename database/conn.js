let mongoose = require("mongoose");
mongoose.connect("mongodb+srv://priyanshu:-4PRlfmvnb@cluster0.xqgdx.mongodb.net/?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("database is connected");
  })
  .catch((error) => {
    console.log(error);
  });

  // mongodb://localhost:27017/loginSystem

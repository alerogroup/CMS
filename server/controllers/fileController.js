const companyModel = require('../api/models/company')
const fileModel = require('../api/models/files')
const cloud = require('../middleware/cloudinary')


exports.createApp = (req, res) => {
  try {
  const fileDetails = {
    filenames: req.body.filenames,
  }
 fileModel.find({
   filenames: req.body.filenames
 }, 
 (err, callback) => {
   if (err) {
     console.log(err)
     return res.json({
       err: err,
       message: 'there was a problem uploading file'
     })
   } else if (callback.length >= 1) {
     return res.json({
       message: 'file already exist'
     })
   } else {
     var fileDetails = {
       filenames: req.body.filenames,
       cloudFile: req.files[1].path,
       fileId: ''
     }
     console.log('i got here')
     console.log(fileDetails.cloudFile)

     cloud.uploads(fileDetails.cloudFile).then((result) => {
      console.log(result)
       var fileDetails = {
         filenames: req.body.filenames,
         cloudFile: result.url,
         fileId: result.id
       }
       console.log('...')
       console.log(fileDetails.cloudFile)
       fileModel.create(fileDetails, (err, created) => {
         if (err) {
            return res.json({
             err: err,
             message: 'could not upload file, try again'
           })
         } else {
           return res.json({
             created: created,
             message: "file uploaded successfully!!"
           })
         }
       })

     })
   }
 })
  } catch (execptions) {
    console.log(execptions)
  }
}

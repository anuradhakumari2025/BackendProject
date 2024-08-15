import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb = call back
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(null, file.originalname); //may be user have same 3-4 folder with same name but as with upload for tiny time so use original name that user given
  },
});

export const upload = multer({ storage: storage });

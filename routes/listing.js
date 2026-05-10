const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {islogedIn,isOwner,validateListing} =require("../middleware.js");
const { equal } = require("joi");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})

const listingcontroller = require("../controllers/listings.js")


router.route("/")
.get( wrapAsync(listingcontroller.index))
.post(islogedIn,
upload.single('listing[image]'),
validateListing,
wrapAsync(listingcontroller.createListing));

//new route
router.get("/new", islogedIn ,listingcontroller.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingcontroller.showListing))
.put(islogedIn, isOwner ,
upload.single('listing[image]'),
validateListing, wrapAsync(listingcontroller.updateListing))

.delete(islogedIn,isOwner, wrapAsync(listingcontroller.destroyListing));

    


//Edit Route
router.get("/:id/edit", islogedIn,isOwner ,wrapAsync(listingcontroller.editListing));



module.exports = router;
const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, islogedIn,isReviewAuthor} = require("../middleware.js")
const reviewcontroller = require("../controllers/review.js")


//Post review route
router.post("/" ,islogedIn, validateReview, wrapAsync(reviewcontroller.postReview));

//delete review route
router.delete("/:reviewId",islogedIn,isReviewAuthor, wrapAsync(reviewcontroller.destroyReview));


module.exports = router;
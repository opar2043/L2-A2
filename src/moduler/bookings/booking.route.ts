import { Router } from "express";

import { bookingController } from "./booking.controller";
import auth from "../../middleware/verify";
import { ROLE } from "../users/user.controller";

const router = Router();

router.post('/' ,auth(ROLE.ADMIN) ,bookingController.createBooking);
router.get('/' ,auth(ROLE.ADMIN), bookingController.getBooking);
router.get('/:bookingId' ,auth(ROLE.CUSTOMER , ROLE.ADMIN), bookingController.singleBooking)
router.put('/:bookingId' ,auth(ROLE.CUSTOMER), bookingController.updateBooking)
router.delete('/:bookingId' ,  bookingController.deleteBooking);

export const bookingRouter = router
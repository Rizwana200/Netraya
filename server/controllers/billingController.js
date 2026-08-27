const {
    Bill,
    Patient,
    User
} = require("../models");


// ==========================================
// CREATE BILL
// ==========================================

const createBill = async (req, res) => {
    try {

        const { patientId } = req.params;

        const {
            billDate,
            checkupCost = 0,
            spectaclesCost = 0,
            spectaclesType,
            paidAmount = 0
        } = req.body;


        const patient = await Patient.findByPk(patientId);

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }


        const checkup = Number(checkupCost);
        const spectacles = Number(spectaclesCost);
        const paid = Number(paidAmount);


        if (
            checkup < 0 ||
            spectacles < 0 ||
            paid < 0
        ) {
            return res.status(400).json({
                message: "Amounts cannot be negative"
            });
        }


        const totalCost =
            checkup + spectacles;


        if (paid > totalCost) {
            return res.status(400).json({
                message:
                    "Paid amount cannot be greater than total cost"
            });
        }


        const dueAmount =
            totalCost - paid;


        let status = "DUE";

        if (
            dueAmount === 0 &&
            totalCost > 0
        ) {
            status = "COMPLETED";
        }


        const bill = await Bill.create({

            patientId,

            billDate:
                billDate ||
                new Date()
                    .toISOString()
                    .split("T")[0],

            checkupCost: checkup,

            spectaclesCost: spectacles,

            spectaclesType:
                spectaclesType || null,

            totalCost,

            paidAmount: paid,

            dueAmount,

            status
        });


        res.status(201).json({

            message: "Bill created successfully",

            bill

        });


    } catch (error) {

        console.error(
            "Create bill error:",
            error
        );

        res.status(500).json({

            message: "Failed to create bill",

            error: error.message

        });
    }
};



// ==========================================
// GET PATIENT BILLS
// ==========================================

const getPatientBills = async (req, res) => {

    try {

        const { patientId } = req.params;


        const patient = await Patient.findByPk(

            patientId,

            {
                include: [
                    {
                        model: User,

                        attributes: [
                            "id",
                            "name",
                            "phone"
                        ]
                    }
                ]
            }

        );


        if (!patient) {

            return res.status(404).json({

                message: "Patient not found"

            });

        }


        const bills = await Bill.findAll({

            where: {
                patientId
            },

            order: [
                ["billDate", "DESC"],
                ["id", "DESC"]
            ]

        });


        res.status(200).json({

            patient: {

                id: patient.id,

                name: patient.User.name,

                phone: patient.User.phone

            },

            totalBills: bills.length,

            bills

        });


    } catch (error) {

        console.error(
            "Get patient bills error:",
            error
        );

        res.status(500).json({

            message: "Failed to get patient bills",

            error: error.message

        });
    }
};



// ==========================================
// UPDATE BILL PAYMENT
// ==========================================

const updateBillPayment = async (req, res) => {

    try {

        const { billId } = req.params;

        const { paymentAmount } = req.body;


        // ------------------------------------------
        // Validate payment
        // ------------------------------------------

        const payment = Number(paymentAmount);


        if (!payment || payment <= 0) {

            return res.status(400).json({

                message:
                    "Payment amount must be greater than 0"

            });

        }


        // ------------------------------------------
        // Find bill
        // ------------------------------------------

        const bill = await Bill.findByPk(billId);


        if (!bill) {

            return res.status(404).json({

                message: "Bill not found"

            });

        }


        // ------------------------------------------
        // Check already completed
        // ------------------------------------------

        if (bill.status === "COMPLETED") {

            return res.status(400).json({

                message:
                    "This bill is already completed"

            });

        }


        // ------------------------------------------
        // Calculate new payment
        // ------------------------------------------

        const currentPaid =
            Number(bill.paidAmount);


        const totalCost =
            Number(bill.totalCost);


        const newPaidAmount =
            currentPaid + payment;


        // ------------------------------------------
        // Prevent overpayment
        // ------------------------------------------

        if (newPaidAmount > totalCost) {

            return res.status(400).json({

                message:
                    "Payment cannot be greater than due amount"

            });

        }


        // ------------------------------------------
        // Calculate new due
        // ------------------------------------------

        const newDueAmount =
            totalCost - newPaidAmount;


        // ------------------------------------------
        // Determine status
        // ------------------------------------------

        let newStatus = "DUE";


        if (newDueAmount === 0) {

            newStatus = "COMPLETED";

        }


        // ------------------------------------------
        // Update bill
        // ------------------------------------------

        await bill.update({

            paidAmount: newPaidAmount,

            dueAmount: newDueAmount,

            status: newStatus

        });


        // ------------------------------------------
        // Response
        // ------------------------------------------

        res.status(200).json({

            message:
                "Payment updated successfully",

            bill

        });


    } catch (error) {

        console.error(
            "Update payment error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to update payment",

            error: error.message

        });

    }

};



module.exports = {

    createBill,

    getPatientBills,

    updateBillPayment

};
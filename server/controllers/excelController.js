const ExcelJS = require("exceljs");

const {
    Token,
    Patient,
    User
} = require("../models");


// ==========================================
// EXPORT TODAY'S TOKENS TO EXCEL
// ==========================================

const exportTodayTokens = async (req, res) => {

    try {

        // ------------------------------------------
        // Get today's date
        // ------------------------------------------

        const today = new Date()
            .toISOString()
            .split("T")[0];


        // ------------------------------------------
        // Get today's tokens
        // ------------------------------------------

        const tokens = await Token.findAll({

            where: {
                tokenDate: today
            },

            include: [

                {
                    model: Patient,

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

            ],

            order: [

                [
                    "tokenNumber",
                    "ASC"
                ]

            ]

        });


        // ------------------------------------------
        // Create workbook
        // ------------------------------------------

        const workbook =
            new ExcelJS.Workbook();


        const worksheet =
            workbook.addWorksheet(
                "Daily Tokens"
            );


        // ------------------------------------------
        // Clinic title
        // ------------------------------------------

        worksheet.mergeCells("A1:F1");

        worksheet.getCell("A1").value =
            "NETRAYA EYE CLINIC - DAILY TOKENS";


        worksheet.mergeCells("A2:F2");

        worksheet.getCell("A2").value =
            `Date: ${today}`;


        // ------------------------------------------
        // Headers
        // ------------------------------------------

        worksheet.addRow([]);


        worksheet.addRow([

            "Token Number",

            "Patient Name",

            "Phone",

            "Source",

            "Status",

            "Token Date"

        ]);


        // ------------------------------------------
        // Add token records
        // ------------------------------------------

        tokens.forEach((token) => {

            worksheet.addRow([

                token.tokenNumber,

                token.Patient?.User?.name || "",

                token.Patient?.User?.phone || "",

                token.source || "",

                token.status || "",

                token.tokenDate

            ]);

        });


        // ------------------------------------------
        // Column widths
        // ------------------------------------------

        worksheet.getColumn(1).width = 18;

        worksheet.getColumn(2).width = 25;

        worksheet.getColumn(3).width = 18;

        worksheet.getColumn(4).width = 18;

        worksheet.getColumn(5).width = 18;

        worksheet.getColumn(6).width = 18;


        // ------------------------------------------
        // Excel response
        // ------------------------------------------

        res.setHeader(

            "Content-Type",

            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );


        res.setHeader(

            "Content-Disposition",

            `attachment; filename=netraya-tokens-${today}.xlsx`

        );


        // ------------------------------------------
        // Send workbook
        // ------------------------------------------

        await workbook.xlsx.write(res);

        res.end();


    } catch (error) {

        console.error(
            "Excel export error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to generate Excel file",

            error:
                error.message

        });

    }

};


module.exports = {
    exportTodayTokens
};
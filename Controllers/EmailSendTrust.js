import initiateEmailTrust from "../libs/initiateEmailTrust.js";


const SendEmailTrust = async (req, res) => {


    try {
        const { name, email, phone, inquiry, message } = req.body;
    
        if (!name || !email || !phone || !inquiry || !message) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
    
    
            })
        }
    
        const formdata = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            inquiry: inquiry.trim(),
            message: message.trim(),
        }
    
    
         await initiateEmailTrust(formdata);
         res.status(200).json({
            success: true,
            message: "Email sent successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error sending email",
            error: error
        })

        console.error("Error sending email controller:", error);
    }    



}


export default SendEmailTrust;
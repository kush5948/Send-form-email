import initiateEmail from "../libs/initiateEmail.js"


const SendEmail = async (req, res) => {


    try {
        const { name, email, phone, message } = req.body;
    
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
    
    
            })
        }
    
        const formdata = {
            name: name.trim(),
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            message: message.trim(),
        }
    
    
         await initiateEmail(formdata);
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
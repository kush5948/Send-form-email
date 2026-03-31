


const emailTemplateTrust = (formData) => {

  const inquirytypeDisplay =(type)=>{
    if(type === "feedback"){
        return "Feedback"
    } else if(type === "general"){
        return "General Inquiry"
    } else if(type === "admission"){
        return "Admission Inquiry"
    }else{
      return `${type} Inquiry`
    }

  }

    return `    
<body style="margin:0; padding:0; background:#f4f4f8; font-family: 'Segoe UI', Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table width="620" cellpadding="0" cellspacing="0"
               style="background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 20px 50px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #7b3f8c, #a86bbf); padding:30px; text-align:center; color:#ffffff;">
              <div style="font-size:24px; font-weight:700; letter-spacing:0.3px; margin:0 0 16px 0; color: #ff5c2b;">
                Mannam Memorial Educational Trust
              </div>
              <h2 style="margin:0; font-size:22px; font-weight:600;">
                ${inquirytypeDisplay(formData.inquiry)}
              </h2>

              <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">
                A new ${inquirytypeDisplay(formData.inquiry)} has been submitted through the Mannam Memorial Educational Trust Portal.
              </p>
            </td>
          </tr>
        
          <!-- Content -->
          <tr>
            <td style="padding:35px;">

              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#f7e9ef; border-radius:14px; padding:25px;">

                <tr>
                  <td style="padding:8px 0; font-size:15px;">
                    <strong>Full Name:</strong> ${formData.name}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 0; font-size:15px;">
                    <strong>Email Address:</strong> ${formData.email}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 0; font-size:15px;">
                    <strong>Phone Number:</strong> ${formData.phone}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 0; font-size:15px;">
                    <strong>Inquiry Type:</strong> ${formData.inquiry}
                  </td>
                </tr>

              </table>

              <table width="100%" cellpadding="0" cellspacing="0"
                     style="margin-top:25px; background:#fff5f8; border-radius:14px; padding:20px; border:1px solid #f0d6df;">
                <tr>
                  <td style="font-size:13px; color:#6b7280; padding-bottom:8px;">
                    MESSAGE
                  </td>
                </tr>
                <tr>
                  <td style="font-size:15px; line-height:1.7;">
                    ${formData.message}
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:35px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${formData.email}"
                       style="display:inline-block; padding:12px 24px;
                              background:#7b3f8c;
                              color:#ffffff;
                              text-decoration:none;
                              border-radius:8px;
                              font-size:14px;
                              font-weight:600;">
                      Reply to Parent
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <tr>
            <td style="background:#fafafa; padding:18px; text-align:center; font-size:12px; color:#888;">
              Mannam Memorial Educational Trust –  Portal Notification
              <br><br>
              © 2026  Mannam Memorial Educational Trust. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
    `
}


export default emailTemplateTrust;

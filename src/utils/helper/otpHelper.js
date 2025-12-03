export async function otpTemplate(otp) {
  return `
        <!DOCTYPE html>
               <html>
               <head>
                   <style>
                       body {
                           font-family: Arial, sans-serif;
                           background-color: #F4F4F4;
                           margin: 0;
                           padding: 0;
                       }
                       .container {
                           max-width: 600px;
                           margin: 50px auto;
                           background-color: #FFFFFF;
                           border-radius: 8px;
                           overflow: hidden;
                           box-shadow: 0 2px 4px #0000001a;
                       }
                       .header {
                           background-color: #4CAF50;
                           color: white;
                           padding: 20px;
                           text-align: center;
                       }
                       .content {
                           padding: 30px;
                           text-align: center;
                       }
                       .otp-code {
                           font-size: 32px;
                           font-weight: bold;
                           color: #4CAF50;
                           letter-spacing: 5px;
                           margin: 20px 0;
                           padding: 15px;
                           background-color: #F9F9F9;
                           border-radius: 5px;
                           display: inline-block;
                       }
                       .footer {
                           background-color: #F4F4F4;
                           padding: 20px;
                           text-align: center;
                           font-size: 12px;
                           color: #666;
                       }
                       .warning {
                           color: #FF6B6B;
                           font-size: 14px;
                           margin-top: 20px;
                       }
                   </style>
               </head>
               <body>
                   <div class="container">
                       <div class="header">
                           <h1 style="color: white;">Temploy</h1>
                           <p style="color: white;">OTP Verification</p>
                       </div>
                       <div class="content">
                           <h2>Your Verification Code</h2>
                           <p>Please use the following OTP to complete your verification:</p>
                           <div class="otp-code">${otp}</div>
                           <p>This code is valid for <strong>5 minutes</strong>.</p>
                           <p class="warning">:warning: Do not share this code with anyone!</p>
                       </div>
                       <div class="footer">
                           <p>If you didn't request this code, please ignore this email.</p>
                           <p>&copy; ${new Date().getFullYear()} Temploy. All rights reserved.</p>
                       </div>
                   </div>
               </body>
               </html>
    `;
}

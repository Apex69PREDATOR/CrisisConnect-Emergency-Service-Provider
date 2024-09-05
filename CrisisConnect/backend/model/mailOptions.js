let mailOptions = {
    from: 'esp.crisisconnect@gmail.com',  // sender address
    // subject: 'Hello from Node.js',  // Subject line
    // text: 'Thanks for choosing crisis connect',  // plain text body
    // You can also use HTML in the email body
    // html: '<h1>Hello from Node.js</h1>'
    subject: 'Welcome to CrisisConnect!',
    html: `
      <h1>Welcome to CrisisConnect!</h1>
      <p>Thank you for signing up on CrisisConnect. We are here to assist you in case of any emergency. Please feel free to contact us anytime you need support.</p>
      <p>Best regards,</p>
      <p><strong>CrisisConnect Team</strong></p>
    `
};
export default mailOptions
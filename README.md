EmailJS Setup Guide for Service Request Form
============================================

This guide walks you through setting up EmailJS to send emails from your HTML form without needing a backend server.

STEP 1: Create an EmailJS Account
---------------------------------
1. Go to https://www.emailjs.com
2. Click "Sign Up" and create a free account
3. Once logged in, you'll be taken to the EmailJS dashboard

STEP 2: Connect an Email Service
--------------------------------
1. In the dashboard, go to "Email Services"
2. Click "Add new service"
3. Choose your email provider (e.g. Gmail, Outlook, Yahoo)
4. Follow the prompts to authorize and connect your email account

NOTE: Once connected, you'll get a Service ID like:
    service_16dqd6e

STEP 3: Create an Email Template
--------------------------------
1. Go to "Email Templates"
2. Click "Create New Template"
3. Name your template (e.g. 🛠️UK Hammer - New Service Request)
4. In the template editor add:

	<table style="width: 100%; font-family: 'Poppins', sans-serif; border-collapse: collapse;">
	  <tr>
		<td style="background-color: #f8f9fa; padding: 20px;">
		  <h2 style="margin: 0 0 10px;">🛠️UK Hammer - New Service Request</h2>
		  <p style="margin: 0 0 20px;">You’ve received a new service request with the following details:</p>

		  <table style="width: 100%; border: 1px solid #dee2e6; border-collapse: collapse;">
			<tr style="background-color: #e9ecef;">
			  <th style="padding: 10px; text-align: left;">Field</th>
			  <th style="padding: 10px; text-align: left;">Value</th>
			</tr>
			<tr>
			  <td style="padding: 10px;">Name</td>
			  <td style="padding: 10px;">{{name}}</td>
			</tr>
			<tr>
			  <td style="padding: 10px;">Email</td>
			  <td style="padding: 10px;">{{email}}</td>
			</tr>
			<tr>
			  <td style="padding: 10px;">Phone</td>
			  <td style="padding: 10px;">{{phone}}</td>
			</tr>
			<tr>
			  <td style="padding: 10px;">Address</td>
			  <td style="padding: 10px;">{{address}}</td>
			</tr>
			<tr>
			  <td style="padding: 10px;">Postcode</td>
			  <td style="padding: 10px;">{{postcode}}</td>
			</tr>
			<tr>
			  <td style="padding: 10px;">Selected Services</td>
			  <td style="padding: 10px;">{{services_combined}}</td>
			</tr>
			<tr>
			  <td style="padding: 10px;">Additional Info</td>
			  <td style="padding: 10px;">{{details}}</td>
			</tr>
		  </table>

		  <p style="margin-top: 20px; font-size: 0.9em; color: #6c757d;">This message was generated from the service request form on your website.</p>
		</td>
	  </tr>
	</table>

NOTE: After saving, you'll get a Template ID like:
    template_40drt89

STEP 4: Get Your Public Key
---------------------------
1. Go to "Account" > "API Keys"
2. Copy your Public Key (also called User ID)

Example:
    ZCz8hOapT8mb1brO4

STEP 5: In the JavaScript Replace IDs with Yours
--------------------------------
Service ID:    service_16dqd6e
Template ID:   template_40drt99
Public Key:    ZCz8hOapT8mU1brO4

You're Done!
------------
Your form is now connected to EmailJS and ready to send emails without a backend.

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

Adding Before & After Photos to the Gallery
============================================
You can display before-and-after photo comparisons on your website by placing images in the `images/` folder using a specific naming convention.

Naming Rules:
-------------
- Each comparison must have two images:
  - One "before" image
  - One "after" image
- Use the format: `imageX[a|b].png`
  - `X` is a number starting from 1 (e.g. 1, 2, 3, ...)
  - `a` = before image
  - `b` = after image

Examples:
---------
    image1a.png  → Before photo for comparison 1
    image1b.png  → After photo for comparison 1

    image2a.png  → Before photo for comparison 2
    image2b.png  → After photo for comparison 2

    image3a.png  → Before photo for comparison 3
    image3b.png  → After photo for comparison 3

How It Works:
-------------
The JavaScript automatically loops through a list of image pairs and creates a visual comparison row for each. As long as your images follow the naming pattern and are placed in the `images/` folder, they will appear in the gallery.

To add more comparisons:
------------------------
1. Name your new images as `image4a.png` and `image4b.png`, then `image5a.png` and `image5b.png`, and so on.
2. Place them in the `images/` directory.
3. Update the `imagePairs` array in `script.js` if needed:

    const imagePairs = ["image1", "image2", "image3", "image4", "image5"];

That's it! The gallery will automatically display the new before-and-after rows.

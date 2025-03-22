# Oxyheal

A full-stack web application developed for a client in the health & wellness space. Oxyheal provides streamlined appointment booking, user authentication, and secure payment functionality, backed by robust cloud infrastructure and integrations.

---

## 🔧 Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js
- **Database:** Amazon RDS (MySQL)
- **Authentication:** Amazon Cognito, Google Sign-In API
- **Payments:** PayPal API
- **Email Service:** Amazon SES
- **Hosting & Infrastructure:** AWS EC2, RDS

---

## 🌐 Features

- Responsive and modern frontend interface
- Secure user authentication with Amazon Cognito and Google Sign-In
- Appointment booking with real-time form validation
- PayPal integration for secure payments
- Email confirmations and notifications using Amazon SES
- Hosted on AWS EC2 with database on RDS for scalability and performance

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js & npm installed
- Git installed
- AWS credentials (for Cognito, SES, RDS access)
- PayPal developer account for API keys

### Steps

```bash
# Clone the repository
git clone https://github.com/Muhammad2609/oxyheal.git
cd oxyheal

# Install backend dependencies
npm install

# (Optional) Navigate to frontend and install its dependencies
cd frontend
npm install

# Start the backend server
node main.js

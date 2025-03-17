# Flexibility Recommender

In this document the **installation process**, **security measures** and  **maintenance recommendation** of the flexibility recommender hosted at OFFIS under flexibility.offis.de are described.

## Source
The source code of the flexibility recommender can be found at [github](https://github.com/Digitalized-Energy-Systems/flexibility-modeling/).

## Server Access

**FQDN des Servers: nfdi4energyvm2.int.lcl.offis.de  
DNS: flexibility.offis.de
Gateway Host: sshgate.offis.de**

SSH access via OFFIS network/VPN with OFFIS username and password. 
FAQ with step-by-step access: 
[https://servicedesk.offis.de/kix/customer.pl?Action=CustomerFAQZoom;ItemID=342](https://servicedesk.offis.de/kix/customer.pl?Action=CustomerFAQZoom;ItemID=342 "https://servicedesk.offis.de/kix/customer.pl?Action=CustomerFAQZoom;ItemID=342")

On the virtual machine (Ubuntu 24.04), the code for the website, which is publicly accessible under the domain, is located in `/var/www/html`. Currently, the website is updated manually, but an automated deployment process from the GitHub repository will be implemented soon.

## Application Security
Application security focuses on implementing secure coding practices to mitigate common vulnerabilities and security risks.

The website does not accept user input, does not require user authentication or login, and its static database contains only publicly available data with no sensitive information. Additionally, the website operates in a read-only mode, ensuring that no modifications can be made to the database through the application. As a result, many common attack vectors, such as SQL Injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and Session Hijacking, are either mitigated by design or not applicable.

The website was developed under consideration of the following key security practices:
- **Input Validation:** Using Prepared Statements to avoid SQL Injection and encoding HTML meta characters to avoid Cross-Site Scripting (XSS).
- **Secure Coding Practices:** Following OWASP (Open Web Application Security Project) guidelines. 
	1. **Broken Access Control:** Ensuring proper permissions and preventing unauthorized actions.
	2. **Cryptographic Failures:** Implementing strong encryption and secure data handling. 
	3. **Injection Prevention:** Avoiding vulnerabilities like SQL injection by sanitizing inputs. 
	4. **Insecure Design:** Applying security principles during the design phase to avoid architectural weaknesses. 
	5. **Security Misconfiguration:** Regularly updating and configuring applications and servers securely. 
	6. **Vulnerable and Outdated Components:** Keeping software libraries and frameworks up-to-date. 
	7. **Identification and Authentication Failures:** Using strong authentication and managing credentials securely. 
	8. **Software and Data Integrity Failures:** Ensuring the integrity of code and data, especially in CI/CD pipelines. 
	9. **Security Logging and Monitoring Failures:** Implementing proper logging, monitoring, and alerting for security incidents. 
	 10. **Server-Side Request Forgery (SSRF):** Validating remote resource requests to prevent unauthorized access.
- **Authentication & Authorization:** Implementing secure login systems and ensuring proper access controls. 
- **Data Sanitization & Escaping:** Preventing unsafe code execution and script injection. 
- **Error Handling:** Avoiding information leakage through detailed error messages. 
- **Use of Secure Libraries and Frameworks:** Ensuring third-party code does not introduce vulnerabilities.

## Server Security

Server security involves maintaining the security of the server and its software. Key practices include: 
- **Regular Updates:** Keeping software like PHP, Apache, and server OS up to date with security patches. 
- **Server Hardening:** Disabling unused services and limiting access to critical components. 
- **Firewall Configuration:** Preventing unauthorized access to the server. 
- **Secure Configuration:** Applying best practices to server settings (e.g., disabling directory browsing in Apache). 
- **Monitoring & Logging:** Detecting suspicious activities through server logs and monitoring tools. 
- **Backup & Recovery:** Preparing for potential data loss or breaches.

Security and regular updates for PHP and Apache are automated with **unattended-upgrades**.

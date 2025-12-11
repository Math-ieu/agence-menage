export const createWhatsAppLink = (phoneNumber: string, message: string): string => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const formatBookingMessage = (serviceName: string, data: any, price: number): string => {
    let details = "";

    // Common fields
    const commonDetails = `
*Client:* ${data.firstName} ${data.lastName}
*Téléphone:* ${data.phoneNumber}
*Ville:* ${data.city} (${data.neighborhood})
*Fréquence:* ${data.frequency}
*Date souhaitée:* ${data.schedulingDate || "Non spécifiée"}
*Heure:* ${data.fixedTime || data.schedulingTime || "Non spécifiée"}
*Prix estimé:* ${price} DH
`;

    // Service specific details
    if (serviceName === "Ménage Bureaux") {
        details = `
*Surface:* ${data.officeSurface} m²
*Durée:* ${data.duration}h
${commonDetails}`;
    } else if (serviceName === "Garde Malade") {
        details = `
*Patient:* ${data.patientGender}, ${data.patientAge} ans
*Mobilité:* ${data.mobility}
*Lieu:* ${data.careLocation}
*Durée:* ${data.duration}h
${commonDetails}`;
    } else {
        // Standard cleaning services
        details = `
*Durée:* ${data.duration}h
*Nombre de personnes:* ${data.numberOfPeople}
${commonDetails}`;
    }

    return `*Nouvelle demande de réservation - ${serviceName}*
${details}
--------------------------------
Ceci est une simulation de réservation.`;
};

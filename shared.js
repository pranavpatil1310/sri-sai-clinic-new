// Database Keys
const DB_APPOINTMENTS_KEY = "sri_sai_appointments";
const DB_DOCTORS_KEY = "sri_sai_doctors";
const DB_TREATMENTS_KEY = "sri_sai_treatments";
const DB_RESULTS_KEY = "sri_sai_results";
const DB_AVAILABILITY_KEY = "sri_sai_clinic_availability";
const DB_DISEASE_PRESETS_KEY = "sri_sai_disease_presets";
const DB_PREMISES_KEY = "sri_sai_premises";

// Seed Infrastructure & Premises Data
const defaultPremises = [
  {
    id: "FAC-1",
    tag: "Laser Suite",
    title: "Sterile Advanced Laser Suite",
    desc: "A temperature-regulated, light-shielded environment housing our Q-Switched Nd:YAG and Artemis-I Diode laser systems.",
    checklist: "UV-sterilized surfaces between treatment sessions\nProtective laser-rated OD7+ eyewear provided\nCalibrated laser energy monitors",
    img: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "FAC-2",
    tag: "Minor OT & Procedures",
    title: "Dermatological Minor Surgery Theatre",
    desc: "Equipped for precise Fractional CO2 surgical vaporizations, wart excisions, skin biopsies, and scar subcisions.",
    checklist: "Shadowless surgical overhead illumination\nHospital-grade vacuum smoke evacuators\nStrict antiseptic draping protocols",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "FAC-3",
    tag: "Consultation Room",
    title: "Private Clinical Diagnostic Cabin",
    desc: "A tranquil, one-on-one consultation setting where patient privacy, detailed skin analysis, and medical confidentiality are paramount.",
    checklist: "High-resolution digital dermoscopy examination tools\nTransparent diagnostic consultations\nSanitized examination loungers with fresh sheets",
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "FAC-4",
    tag: "Reception & Recovery",
    title: "Patient Lounge & Post-Care Bay",
    desc: "Spacious, clean seating area with scheduled appointments to prevent overcrowding and maintain short wait times.",
    checklist: "Automated same-day token allocation\nPost-laser soothing recovery area\nStrict sanitization stations at intake",
    img: "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&w=700&q=80"
  }
];

const defaultDiseasePresets = [
  {
    diseaseName: "Melasma & Facial Hyperpigmentation",
    notes: "Epidermal and dermal melasma patches on bilateral cheeks. Recommended Q-Switched Nd:YAG Laser toning and strict sun avoidance.",
    medicines: [
      { name: "Kojic & Azelaic Acid 10% Cream", dosage: "Pea size", freq: "0-0-1", duration: "30 Days", inst: "Apply only at night" },
      { name: "Mineral Sunscreen Gel SPF 50+", dosage: "Generous", freq: "1-1-0", duration: "Daily", inst: "Reapply every 3-4 hours outdoors" },
      { name: "Tab. Vitamin C 500mg", dosage: "1 Tablet", freq: "1-0-0", duration: "30 Days", inst: "After breakfast" }
    ]
  },
  {
    diseaseName: "Acne Vulgaris (Grade II/III)",
    notes: "Active inflammatory papules and comedones. Prescribed topical retinoid and oral antimicrobial therapy.",
    medicines: [
      { name: "Clindamycin 1% + Adapalene 0.1% Gel", dosage: "Thin layer", freq: "0-0-1", duration: "20 Days", inst: "Apply to spots at night" },
      { name: "Tab. Doxycycline 100mg", dosage: "1 Capsule", freq: "1-0-1", duration: "10 Days", inst: "Take with food and full glass of water" },
      { name: "Sebum Control Foaming Wash", dosage: "Face wash", freq: "1-0-1", duration: "Daily", inst: "Wash twice daily" }
    ]
  },
  {
    diseaseName: "Post-Acne Scars (Fractional CO2 Laser)",
    notes: "Atrophic boxcar acne scars. Planned for Fractional CO2 Laser resurfacing across bilateral cheeks.",
    medicines: [
      { name: "Mupirocin 2% Ointment", dosage: "Thin layer", freq: "1-0-1", duration: "5 Days", inst: "Apply on treated area post-laser" },
      { name: "Ceramide Barrier Repair Cream", dosage: "Generous", freq: "1-1-1", duration: "15 Days", inst: "Keep skin constantly moisturized" },
      { name: "Tab. Paracetamol 650mg", dosage: "1 Tablet", freq: "SOS", duration: "3 Days", inst: "If post-procedure discomfort occurs" }
    ]
  }
];

const defaultDoctors = [
  {
    id: "DOC-1",
    name: "Dr. S. Sanjana Anand",
    qualifications: "M.B.B.S, M.D. (Dermatology)",
    role: "Lead Consultant Dermatologist & Hair Specialist",
    timings: "10:00 AM – 1:00 PM & 5:00 PM – 8:00 PM",
    bio: "Specializing in advanced aesthetic dermatology, Q-switched lasers, diode hair reduction, and fractional scar reconstruction with clinical precision.",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80"
  }
];

const defaultTreatments = [
  { id: "TRT-1", category: "Laser Dermatology", title: "Q-Switched Nd:YAG Laser (Q'Laze)", desc: "Targeted laser toning, tattoo removal, lip lightening, melasma clearing, and Hollywood carbon peel.", badge: "Advanced Laser Tech" },
  { id: "TRT-2", category: "Hair Reduction", title: "Artemis-I Diode Laser Hair Removal", desc: "Triple wavelength virtually painless high-power hair reduction safe for all Indian skin types.", badge: "FDA Certified" },
  { id: "TRT-3", category: "Fractional Laser", title: "Fractional CO2 Laser Resurfacing", desc: "Gold standard for stubborn acne scars, surgical scars, striae alba, and pore tightening.", badge: "Clinical Standard" },
  { id: "TRT-4", category: "Cosmetic Dermatology", title: "Surgical Excision & Minor OT", desc: "Precision removal of skin tags, DPN, seborrheic keratosis, keloids, xanthelasma, and warts.", badge: "Same-Day Procedure" }
];

const defaultResults = [
  { id: "RES-1", title: "Hyper Pigmentation & Melasma Clearing", procedure: "Q-Switched Nd:YAG Laser & Topical Protocol", beforeImg: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=400&q=80", afterImg: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=400&q=80" },
  { id: "RES-2", title: "Laser Tattoo Removal", procedure: "Precision Q'Laze Multi-Pass Protocol", beforeImg: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=400&q=80", afterImg: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=400&q=80" }
];

const defaultAppointments = [
  {
    id: "1",
    name: "Ananya Iyer",
    phone: "9988443959",
    age: "28",
    treatment: "Q-Switched Nd:YAG Laser",
    doctor: "Dr. S. Sanjana Anand",
    place: "Patil Nagar, Hospet",
    date: new Date().toISOString().split("T")[0],
    slot: "10:30 AM",
    type: "Online",
    diagnosis: "Facial hyperpigmentation & melasma patches on bilateral zygomatic arch.",
    medicines: [
      { name: "Kojic & Azelaic Acid 10% Cream", dosage: "Pea size", freq: "0-0-1", duration: "30 Days", inst: "Apply only at night" }
    ],
    status: "Confirmed",
    timestamp: Date.now() - 3600000
  }
];

class ClinicStore {
  static getAppointments() {
    try {
      const raw = localStorage.getItem(DB_APPOINTMENTS_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return (parsed && parsed.length > 0) ? parsed : defaultAppointments;
    } catch { return defaultAppointments; }
  }

  // Combined Daily Auto-Reset Counter for Online & Walk-in Bookings
  static saveAppointment(data) {
    const list = this.getAppointments();
    const today = new Date().toISOString().split("T")[0];
    const entryDate = data.date || today;

    // Filter appointments belonging to this calendar date
    const todayAppointments = list.filter(a => (a.date || today) === entryDate);
    const existingTokens = todayAppointments
      .map(a => parseInt(a.id, 10))
      .filter(num => !isNaN(num));

    // Next token starts from 1 each day and increments sequentially
    const nextToken = existingTokens.length > 0 ? Math.max(...existingTokens) + 1 : 1;

    const newEntry = {
      ...data,
      id: String(nextToken), // Shared token pool: "1", "2", "3"...
      date: entryDate,
      type: data.type || (data.slot && data.slot.toLowerCase().includes("walk-in") ? "Walk-in" : "Online"),
      status: data.status || "Pending",
      slot: data.slot || "Awaiting Reception Slot",
      diagnosis: data.diagnosis || "",
      medicines: data.medicines || [],
      timestamp: Date.now()
    };

    list.unshift(newEntry);
    localStorage.setItem(DB_APPOINTMENTS_KEY, JSON.stringify(list));
    return newEntry;
  }

  static updateAppointment(id, updates) {
    const list = this.getAppointments();
    const idx = list.findIndex(a => String(a.id) === String(id));
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updates };
      localStorage.setItem(DB_APPOINTMENTS_KEY, JSON.stringify(list));
    }
  }

  // Premises
  static getPremises() {
    try {
      const raw = localStorage.getItem(DB_PREMISES_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return (parsed && parsed.length > 0) ? parsed : defaultPremises;
    } catch { return defaultPremises; }
  }
  static addPremise(fac) {
    const list = this.getPremises();
    list.push({ ...fac, id: "FAC-" + (list.length + 1) });
    localStorage.setItem(DB_PREMISES_KEY, JSON.stringify(list));
  }
  static updatePremise(id, updates) {
    const list = this.getPremises();
    const idx = list.findIndex(f => f.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updates };
      localStorage.setItem(DB_PREMISES_KEY, JSON.stringify(list));
    }
  }
  static deletePremise(id) {
    const list = this.getPremises().filter(f => f.id !== id);
    localStorage.setItem(DB_PREMISES_KEY, JSON.stringify(list));
  }

  // Disease Presets
  static getDiseasePresets() {
    try {
      const raw = localStorage.getItem(DB_DISEASE_PRESETS_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return (parsed && parsed.length > 0) ? parsed : defaultDiseasePresets;
    } catch { return defaultDiseasePresets; }
  }
  static saveDiseasePreset(preset) {
    const list = this.getDiseasePresets();
    const idx = list.findIndex(p => p.diseaseName.toLowerCase() === preset.diseaseName.toLowerCase());
    if (idx > -1) list[idx] = preset;
    else list.push(preset);
    localStorage.setItem(DB_DISEASE_PRESETS_KEY, JSON.stringify(list));
  }
  static deleteDiseasePreset(name) {
    const list = this.getDiseasePresets().filter(p => p.diseaseName !== name);
    localStorage.setItem(DB_DISEASE_PRESETS_KEY, JSON.stringify(list));
  }
  static bulkImportPresets(newPresetsList) {
    const current = this.getDiseasePresets();
    newPresetsList.forEach(np => {
      const idx = current.findIndex(c => c.diseaseName.toLowerCase() === np.diseaseName.toLowerCase());
      if (idx > -1) current[idx] = np;
      else current.push(np);
    });
    localStorage.setItem(DB_DISEASE_PRESETS_KEY, JSON.stringify(current));
  }

  // Doctors
  static getDoctors() {
    try {
      const raw = localStorage.getItem(DB_DOCTORS_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return (parsed && parsed.length > 0) ? parsed : defaultDoctors;
    } catch { return defaultDoctors; }
  }
  static addDoctor(doc) {
    const list = this.getDoctors();
    list.push({ ...doc, id: "DOC-" + (list.length + 1) });
    localStorage.setItem(DB_DOCTORS_KEY, JSON.stringify(list));
  }
  static updateDoctor(id, updates) {
    const list = this.getDoctors();
    const idx = list.findIndex(d => d.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updates };
      localStorage.setItem(DB_DOCTORS_KEY, JSON.stringify(list));
    }
  }
  static deleteDoctor(id) {
    const list = this.getDoctors().filter(d => d.id !== id);
    localStorage.setItem(DB_DOCTORS_KEY, JSON.stringify(list));
  }

  // Treatments
  static getTreatments() {
    try {
      const raw = localStorage.getItem(DB_TREATMENTS_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return (parsed && parsed.length > 0) ? parsed : defaultTreatments;
    } catch { return defaultTreatments; }
  }
  static addTreatment(trt) {
    const list = this.getTreatments();
    list.push({ ...trt, id: "TRT-" + (list.length + 1) });
    localStorage.setItem(DB_TREATMENTS_KEY, JSON.stringify(list));
  }
  static updateTreatment(id, updates) {
    const list = this.getTreatments();
    const idx = list.findIndex(t => t.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updates };
      localStorage.setItem(DB_TREATMENTS_KEY, JSON.stringify(list));
    }
  }
  static deleteTreatment(id) {
    const list = this.getTreatments().filter(t => t.id !== id);
    localStorage.setItem(DB_TREATMENTS_KEY, JSON.stringify(list));
  }

  // Results
  static getResults() {
    try {
      const raw = localStorage.getItem(DB_RESULTS_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return (parsed && parsed.length > 0) ? parsed : defaultResults;
    } catch { return defaultResults; }
  }
  static addResult(res) {
    const list = this.getResults();
    list.push({ ...res, id: "RES-" + (list.length + 1) });
    localStorage.setItem(DB_RESULTS_KEY, JSON.stringify(list));
  }
  static updateResult(id, updates) {
    const list = this.getResults();
    const idx = list.findIndex(r => r.id === id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...updates };
      localStorage.setItem(DB_RESULTS_KEY, JSON.stringify(list));
    }
  }
  static deleteResult(id) {
    const list = this.getResults().filter(r => r.id !== id);
    localStorage.setItem(DB_RESULTS_KEY, JSON.stringify(list));
  }

  // Intake Availability
  static isAvailable() {
    try {
      const raw = localStorage.getItem(DB_AVAILABILITY_KEY);
      return raw === null ? true : JSON.parse(raw);
    } catch { return true; }
  }
  static setAvailability(val) {
    localStorage.setItem(DB_AVAILABILITY_KEY, JSON.stringify(val));
  }
}

function showToast(msg, type = "success") {
  let c = document.getElementById("toast-container");
  if (!c) {
    c = document.createElement("div");
    c.id = "toast-container";
    document.body.appendChild(c);
  }
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.innerText = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}
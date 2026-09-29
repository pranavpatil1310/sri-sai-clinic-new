// Utility: Read file to Data URL
const readFileAsDataURL = (file) => {
  return new Promise((resolve) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
};

// ==================================================
// GLOBAL MODAL CONTROLLERS (Immediate Window Scope)
// ==================================================
window.openAddPremiseModal = () => {
  const f = document.getElementById("addPremiseForm");
  if (f) f.reset();
  const idEl = document.getElementById("editPremiseId");
  if (idEl) idEl.value = "";
  const titleEl = document.getElementById("premiseModalTitle");
  if (titleEl) titleEl.innerText = "Add Hospital Premise Room";
  const btnEl = document.getElementById("premiseSubmitBtn");
  if (btnEl) btnEl.innerText = "Save Room Details";
  const hintEl = document.getElementById("premisePhotoHint");
  if (hintEl) hintEl.style.display = "none";
  const modal = document.getElementById("addPremiseModal");
  if (modal) modal.classList.add("active");
};
window.closeAddPremiseModal = () => {
  const modal = document.getElementById("addPremiseModal");
  if (modal) modal.classList.remove("active");
};

window.openAddDoctorModal = () => {
  const f = document.getElementById("addDocForm");
  if (f) f.reset();
  const idEl = document.getElementById("editDocId");
  if (idEl) idEl.value = "";
  const titleEl = document.getElementById("docModalTitle");
  if (titleEl) titleEl.innerText = "Add New Doctor Profile";
  const btnEl = document.getElementById("docSubmitBtn");
  if (btnEl) btnEl.innerText = "Save Doctor Profile";
  const modal = document.getElementById("addDocModal");
  if (modal) modal.classList.add("active");
};
window.closeAddDoctorModal = () => {
  const modal = document.getElementById("addDocModal");
  if (modal) modal.classList.remove("active");
};

window.openAddTreatmentModal = () => {
  const f = document.getElementById("addTrtForm");
  if (f) f.reset();
  const idEl = document.getElementById("editTrtId");
  if (idEl) idEl.value = "";
  const titleEl = document.getElementById("trtModalTitle");
  if (titleEl) titleEl.innerText = "Add Clinical Treatment";
  const btnEl = document.getElementById("trtSubmitBtn");
  if (btnEl) btnEl.innerText = "Save Treatment";
  const modal = document.getElementById("addTrtModal");
  if (modal) modal.classList.add("active");
};
window.closeAddTreatmentModal = () => {
  const modal = document.getElementById("addTrtModal");
  if (modal) modal.classList.remove("active");
};

window.openAddResultModal = () => {
  const f = document.getElementById("addResForm");
  if (f) f.reset();
  const idEl = document.getElementById("editResId");
  if (idEl) idEl.value = "";
  const titleEl = document.getElementById("resModalTitle");
  if (titleEl) titleEl.innerText = "Add Before & After Case Study";
  const btnEl = document.getElementById("resSubmitBtn");
  if (btnEl) btnEl.innerText = "Save Case Study";
  const hintB = document.getElementById("resBeforeHint");
  if (hintB) hintB.style.display = "none";
  const hintA = document.getElementById("resAfterHint");
  if (hintA) hintA.style.display = "none";
  const bFile = document.getElementById("newResBeforeFile");
  if (bFile) bFile.required = true;
  const aFile = document.getElementById("newResAfterFile");
  if (aFile) aFile.required = true;
  const modal = document.getElementById("addResModal");
  if (modal) modal.classList.add("active");
};
window.closeAddResultModal = () => {
  const modal = document.getElementById("addResModal");
  if (modal) modal.classList.remove("active");
};

window.openAddPresetModal = () => {
  const modal = document.getElementById("addPresetModal");
  if (modal) modal.classList.add("active");
};
window.closeAddPresetModal = () => {
  const modal = document.getElementById("addPresetModal");
  if (modal) modal.classList.remove("active");
};

// ==================================================
// DOM INITIALIZATION
// ==================================================
document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------
  // 1. PATIENT SITE CONTROLLER
  // ------------------------------------------
  const treatmentsContainer = document.getElementById("treatmentsContainer");
  const premisesContainer = document.getElementById("premisesContainer");
  const resultsContainer = document.getElementById("resultsContainer");
  const doctorsContainer = document.getElementById("doctorsContainer");
  const publicBookingForm = document.getElementById("publicBookingForm");
  const bookingClosedNotice = document.getElementById("bookingClosedNotice");

  // Dynamic Logo Sync across pages
  const savedLogo = localStorage.getItem("sri_sai_clinic_logo");
  if (savedLogo) {
    document.querySelectorAll(".brand-logo-circle").forEach(img => {
      img.src = savedLogo;
    });
  }

  if (treatmentsContainer) {
    const treatments = ClinicStore.getTreatments();
    treatmentsContainer.innerHTML = treatments.map(t => `
      <div class="service-card">
        <div>
          ${t.badge ? `<span class="service-badge">${t.badge}</span>` : ''}
          <h4>${t.title}</h4>
          <p>${t.desc}</p>
        </div>
      </div>
    `).join('');

    if (premisesContainer) {
      const premises = ClinicStore.getPremises();
      premisesContainer.innerHTML = premises.map(p => `
        <div class="facility-card">
          <div class="facility-img-box">
            <span class="facility-tag">${p.tag}</span>
            <img src="${p.img}" alt="${p.title}" />
          </div>
          <div class="facility-content">
            <h4>${p.title}</h4>
            <p>${p.desc}</p>
            <ul class="facility-checklist">
              ${(p.checklist || '').split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('');
    }

    if (resultsContainer) {
      const results = ClinicStore.getResults();
      resultsContainer.innerHTML = results.map(r => `
        <div class="result-card">
          <h4>${r.title}</h4>
          <p>${r.procedure}</p>
          <div class="comparison-box">
            <div class="img-container">
              <span class="badge-label">Before</span>
              <img src="${r.beforeImg}" alt="Before treatment" />
            </div>
            <div class="img-container">
              <span class="badge-label">After Result</span>
              <img src="${r.afterImg}" alt="After treatment" />
            </div>
          </div>
        </div>
      `).join('');
    }

    if (doctorsContainer) {
      const doctors = ClinicStore.getDoctors();
      doctorsContainer.innerHTML = doctors.map(d => `
        <div class="doctor-card">
          <img src="${d.img || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80'}" alt="${d.name}" />
          <div class="doctor-info">
            <h3>${d.name}</h3>
            <h5>${d.qualifications} • ${d.role}</h5>
            <p>${d.bio}</p>
            <span class="timing-tag">🕒 Timings: ${d.timings}</span>
          </div>
        </div>
      `).join('');
    }

    const docSelect = document.getElementById("pDoctor");
    if (docSelect) {
      const doctors = ClinicStore.getDoctors();
      docSelect.innerHTML = doctors.map(d => `<option value="${d.name}">${d.name} (${d.qualifications})</option>`).join('');
    }

    const isAvail = ClinicStore.isAvailable();
    if (bookingClosedNotice) {
      if (!isAvail) {
        bookingClosedNotice.style.display = "block";
        if (publicBookingForm) publicBookingForm.querySelectorAll("input, select, button").forEach(el => el.disabled = true);
      } else {
        bookingClosedNotice.style.display = "none";
      }
    }

    // Simplified Intake: Only Name, Age, Concern (Skin/Hair), and City/Area
    if (publicBookingForm) {
      publicBookingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("pName")?.value?.trim() || "Anonymous Patient";
        const age = document.getElementById("pAge")?.value?.trim() || "-";
        const treatment = document.getElementById("pTreatment")?.value || "Skin Concern";
        const place = document.getElementById("pPlace")?.value?.trim() || "Hospet";

        ClinicStore.saveAppointment({
          name: name,
          phone: "-",
          age: age,
          doctor: "Dr. S. Sanjana Anand",
          treatment: treatment,
          place: place,
          date: new Date().toISOString().split("T")[0],
          type: "Online",
          status: "Pending"
        });

        publicBookingForm.reset();
        showToast("Appointment submitted! Reception will allocate your slot.");
      });
    }
  }

  // ------------------------------------------
  // 2. RECEPTIONIST DESK CONTROLLER
  // ------------------------------------------
  const recTableBody = document.getElementById("receptionistTableBody");
  const toggleBtn = document.getElementById("toggleAvailabilityBtn");
  const availBadge = document.getElementById("availabilityBadge");

  if (recTableBody) {
    function updateAvailabilityState() {
      const isAvail = ClinicStore.isAvailable();
      if (availBadge) {
        availBadge.innerText = isAvail ? "Intake Open" : "Bookings Paused";
        availBadge.className = isAvail ? "badge badge-confirmed" : "badge badge-cancelled";
      }
      if (toggleBtn) {
        toggleBtn.innerText = isAvail ? "Pause Bookings" : "Resume Bookings";
        toggleBtn.style.background = isAvail ? "#dc2626" : "#059669";
      }
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const next = !ClinicStore.isAvailable();
        ClinicStore.setAvailability(next);
        updateAvailabilityState();
        showToast(next ? "Online bookings opened!" : "Bookings paused for clinic.");
      });
      updateAvailabilityState();
    }

    window.openSlotModal = (id) => {
      document.getElementById("slotAptId").value = id;
      document.getElementById("slotModal").classList.add("active");
    };
    window.closeSlotModal = () => document.getElementById("slotModal").classList.remove("active");

    window.confirmAppointmentWithSlot = () => {
      const id = document.getElementById("slotAptId").value;
      const slot = document.getElementById("assignedTimeSlot").value;
      ClinicStore.updateAppointment(id, { status: "Confirmed", slot: slot });
      closeSlotModal();
      showToast(`Slot assigned: ${slot}`);
      renderReceptionist();
    };

    window.cancelAppointment = (id) => {
      if (confirm("Decline this appointment request?")) {
        ClinicStore.updateAppointment(id, { status: "Cancelled" });
        showToast("Appointment cancelled", "error");
        renderReceptionist();
      }
    };

    const walkinModal = document.getElementById("walkinModal");
    const openWalkinBtn = document.getElementById("openWalkinModalBtn");
    const walkinForm = document.getElementById("walkinForm");

    if (openWalkinBtn && walkinModal) openWalkinBtn.addEventListener("click", () => walkinModal.classList.add("active"));
    window.closeWalkinModal = () => { if (walkinModal) walkinModal.classList.remove("active"); };

    if (walkinForm) {
      walkinForm.addEventListener("submit", (e) => {
        e.preventDefault();
        ClinicStore.saveAppointment({
          name: document.getElementById("wName").value.trim(),
          phone: document.getElementById("wPhone").value.trim(),
          age: document.getElementById("wAge").value.trim(),
          treatment: document.getElementById("wTreatment").value.trim(),
          place: document.getElementById("wPlace").value.trim(),
          slot: document.getElementById("wSlot").value || "Walk-in / Immediate",
          doctor: "Dr. S. Sanjana Anand",
          date: new Date().toISOString().split("T")[0],
          type: "Walk-in",
          status: "Confirmed"
        });
        walkinForm.reset();
        closeWalkinModal();
        showToast("Walk-in appointment recorded!");
        renderReceptionist();
      });
    }

    function renderReceptionist() {
      const data = ClinicStore.getAppointments();
      recTableBody.innerHTML = "";
      if (data.length === 0) {
        recTableBody.innerHTML = `<tr><td colspan="7" class="empty-state">No appointments found.</td></tr>`;
        return;
      }
      data.forEach(apt => {
        recTableBody.innerHTML += `
          <tr>
            <td><strong>#${apt.id}</strong></td>
            <td>
              <strong>${apt.name}</strong> (${apt.age} yrs)<br>
              <small style="color:#777;">Ph: ${apt.phone}</small>
            </td>
            <td>
              ${apt.doctor || 'Dr. S. Sanjana Anand'}<br>
              <small style="color:#555;">${apt.treatment}</small>
              <span class="badge" style="font-size:0.65rem; background:#f0f0f0; color:#333; margin-left:4px;">${apt.type || 'Online'}</span>
            </td>
            <td>${apt.place}</td>
            <td><strong style="color:var(--primary-green);">${apt.slot}</strong></td>
            <td><span class="badge badge-${apt.status.toLowerCase()}">${apt.status}</span></td>
            <td class="table-actions">
              ${apt.status === 'Pending' ? `
                <button class="btn-main" style="padding:6px 10px; font-size:0.75rem;" onclick="openSlotModal('${apt.id}')">Assign Slot</button>
                <button class="btn-danger" onclick="cancelAppointment('${apt.id}')">Decline</button>
              ` : `<small style="color:#888;">Processed</small>`}
            </td>
          </tr>
        `;
      });
    }
    renderReceptionist();
  }

  // ------------------------------------------
  // 3. DOCTOR PORTAL & ADMIN CONTROLLER
  // ------------------------------------------
  const docTableBody = document.getElementById("doctorTableBody");

  if (docTableBody) {
    window.applyDiseasePreset = (aptId, selectedDisease) => {
      if (!selectedDisease) return;
      const presets = ClinicStore.getDiseasePresets();
      const preset = presets.find(p => p.diseaseName === selectedDisease);
      if (!preset) return;

      const diagArea = document.getElementById(`diag-${aptId}`);
      if (diagArea) diagArea.value = preset.notes;

      const tbody = document.getElementById(`rx-rows-${aptId}`);
      if (tbody) {
        tbody.innerHTML = preset.medicines.map(m => `
          <tr>
            <td><input type="text" class="rx-input rx-name" value="${m.name}" /></td>
            <td><input type="text" class="rx-input rx-dose" value="${m.dosage}" /></td>
            <td><input type="text" class="rx-input rx-freq" value="${m.freq}" /></td>
            <td><input type="text" class="rx-input rx-dur" value="${m.duration}" /></td>
            <td><input type="text" class="rx-input rx-inst" value="${m.inst}" /></td>
            <td><button class="btn-del-row" onclick="this.closest('tr').remove()">✕</button></td>
          </tr>
        `).join('');
      }
      showToast(`Loaded protocol for: ${preset.diseaseName}`);
    };

    window.addMedicineRow = (aptId) => {
      const tbody = document.getElementById(`rx-rows-${aptId}`);
      if (!tbody) return;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="text" class="rx-input rx-name" placeholder="Medicine / Brand" /></td>
        <td><input type="text" class="rx-input rx-dose" placeholder="e.g. 1 Tab" /></td>
        <td><input type="text" class="rx-input rx-freq" placeholder="e.g. 1-0-1" /></td>
        <td><input type="text" class="rx-input rx-dur" placeholder="e.g. 15 Days" /></td>
        <td><input type="text" class="rx-input rx-inst" placeholder="After food" /></td>
        <td><button class="btn-del-row" onclick="this.closest('tr').remove()">✕</button></td>
      `;
      tbody.appendChild(tr);
    };

    window.saveAndPrintPrescription = (aptId) => {
      const diag = document.getElementById(`diag-${aptId}`)?.value || "";
      const rows = document.querySelectorAll(`#rx-rows-${aptId} tr`);
      const meds = [];

      rows.forEach(r => {
        const name = r.querySelector(".rx-name")?.value.trim();
        if (name) {
          meds.push({
            name: name,
            dosage: r.querySelector(".rx-dose")?.value.trim() || "-",
            freq: r.querySelector(".rx-freq")?.value.trim() || "-",
            duration: r.querySelector(".rx-dur")?.value.trim() || "-",
            inst: r.querySelector(".rx-inst")?.value.trim() || "-"
          });
        }
      });

      ClinicStore.updateAppointment(aptId, { diagnosis: diag, medicines: meds, status: "Completed" });
      const apt = ClinicStore.getAppointments().find(a => String(a.id) === String(aptId));

      document.getElementById("printName").innerText = apt.name;
      document.getElementById("printAge").innerText = apt.age;
      document.getElementById("printDate").innerText = apt.date;
      document.getElementById("printId").innerText = `#${apt.id}`;
      document.getElementById("printDiagnosis").innerText = diag || "Clinical consultation completed.";

      const printBody = document.getElementById("printMedicinesBody");
      if (printBody) {
        printBody.innerHTML = "";
        if (meds.length === 0) {
          printBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No oral/topical medicines prescribed.</td></tr>`;
        } else {
          meds.forEach(m => {
            printBody.innerHTML += `
              <tr>
                <td><strong>${m.name}</strong></td>
                <td>${m.dosage}</td>
                <td>${m.freq}</td>
                <td>${m.duration}</td>
                <td>${m.inst}</td>
              </tr>
            `;
          });
        }
      }

      showToast("Preparing formal prescription for printer...");
      setTimeout(() => {
        window.print();
        renderDoctorQueue();
      }, 300);
    };

    window.reprintPrescription = (aptId) => {
      const apt = ClinicStore.getAppointments().find(a => String(a.id) === String(aptId));
      if (!apt) return;

      document.getElementById("printName").innerText = apt.name;
      document.getElementById("printAge").innerText = apt.age;
      document.getElementById("printDate").innerText = apt.date;
      document.getElementById("printId").innerText = `#${apt.id}`;
      document.getElementById("printDiagnosis").innerText = apt.diagnosis || "Clinical consultation completed.";

      const printBody = document.getElementById("printMedicinesBody");
      if (printBody) {
        printBody.innerHTML = "";
        if (!apt.medicines || apt.medicines.length === 0) {
          printBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No oral/topical medicines prescribed.</td></tr>`;
        } else {
          apt.medicines.forEach(m => {
            printBody.innerHTML += `
              <tr>
                <td><strong>${m.name}</strong></td>
                <td>${m.dosage}</td>
                <td>${m.freq}</td>
                <td>${m.duration}</td>
                <td>${m.inst}</td>
              </tr>
            `;
          });
        }
      }

      showToast("Opening prescription print preview...");
      setTimeout(() => window.print(), 300);
    };

    function renderDoctorQueue() {
      const allAppointments = ClinicStore.getAppointments();
      const presets = ClinicStore.getDiseasePresets();

      const activeQueue = allAppointments.filter(a => a.status === "Confirmed");
      docTableBody.innerHTML = "";

      if (activeQueue.length === 0) {
        docTableBody.innerHTML = `<tr><td colspan="4" class="empty-state">No patients currently waiting in consultation queue.</td></tr>`;
      } else {
        activeQueue.forEach(apt => {
          docTableBody.innerHTML += `
            <tr>
              <td>
                <span class="badge" style="background:#183324; color:#fff; font-size:0.8rem; margin-bottom:4px;">Token #${apt.id}</span><br>
                <strong>${apt.name}</strong> (${apt.age} yrs)<br>
                <small style="color:#777;">Loc: ${apt.place}</small>
              </td>
              <td>
                <strong style="color:var(--primary-green); font-size:0.95rem;">${apt.slot}</strong><br>
                <small style="color:#555;">Concern: ${apt.treatment}</small><br>
                <span class="badge badge-confirmed">Confirmed</span>
              </td>
              <td>
                <div style="background:#eef5f0; border:1px solid #cce3d4; border-radius:4px; padding:8px 10px; margin-bottom:8px; display:flex; align-items:center; gap:10px;">
                  <label style="font-size:0.8rem; font-weight:700; color:var(--primary-green); white-space:nowrap;">⚡ Select Disease Protocol:</label>
                  <select style="width:100%; padding:5px 8px; font-size:0.82rem; border-radius:4px; border:1px solid #3c654b;" onchange="applyDiseasePreset('${apt.id}', this.value)">
                    <option value="">-- Choose Disease to Auto-Load Prescription --</option>
                    ${presets.map(p => `<option value="${p.diseaseName}">${p.diseaseName}</option>`).join('')}
                  </select>
                </div>

                <label style="font-size:0.75rem; font-weight:bold; color:#444;">Diagnosis & Clinical Notes:</label>
                <textarea id="diag-${apt.id}" style="width:100%; border:1px solid #ccc; border-radius:4px; padding:6px; font-size:0.85rem;" placeholder="Clinical findings...">${apt.diagnosis || ''}</textarea>

                <div class="rx-builder">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="font-size:0.8rem; color:#333;">Prescribed Medicines (Editable Table)</strong>
                    <button type="button" class="btn-main" style="padding:4px 8px; font-size:0.75rem;" onclick="addMedicineRow('${apt.id}')">+ Add Drug</button>
                  </div>
                  <table class="rx-table">
                    <thead>
                      <tr>
                        <th>Medicine Name</th>
                        <th>Dose</th>
                        <th>Freq</th>
                        <th>Duration</th>
                        <th>Instruction</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody id="rx-rows-${apt.id}">
                      <tr>
                        <td><input type="text" class="rx-input rx-name" placeholder="Drug name" /></td>
                        <td><input type="text" class="rx-input rx-dose" placeholder="e.g. 1 Tab" /></td>
                        <td><input type="text" class="rx-input rx-freq" placeholder="1-0-1" /></td>
                        <td><input type="text" class="rx-input rx-dur" placeholder="10 Days" /></td>
                        <td><input type="text" class="rx-input rx-inst" placeholder="After food" /></td>
                        <td><button class="btn-del-row" onclick="this.closest('tr').remove()">✕</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
              <td>
                <button class="btn-main" style="padding:10px 14px; font-size:0.85rem;" onclick="saveAndPrintPrescription('${apt.id}')">🖨️ Save & Print Prescription</button>
              </td>
            </tr>
          `;
        });
      }

      const historyTableBody = document.getElementById("doctorHistoryTableBody");
      if (historyTableBody) {
        const completedList = allAppointments.filter(a => a.status === "Completed");
        historyTableBody.innerHTML = "";

        if (completedList.length === 0) {
          historyTableBody.innerHTML = `<tr><td colspan="5" class="empty-state">No consultations completed yet today.</td></tr>`;
        } else {
          completedList.forEach(apt => {
            const medList = (apt.medicines && apt.medicines.length > 0)
              ? apt.medicines.map(m => `${m.name} (${m.freq})`).join(", ")
              : "No oral/topical medicines";

            historyTableBody.innerHTML += `
              <tr>
                <td>
                  <span class="badge" style="background:#183324; color:#fff; font-size:0.75rem;">Token #${apt.id}</span><br>
                  <strong>${apt.name}</strong> (${apt.age} yrs)
                </td>
                <td>${apt.date}<br><small style="color:var(--primary-green); font-weight:600;">${apt.slot}</small></td>
                <td><small style="color:#444;">${apt.diagnosis || 'Clinical consultation completed.'}</small></td>
                <td><small style="color:#666;">${medList}</small></td>
                <td>
                  <button class="btn-outline" style="padding:6px 12px; font-size:0.75rem;" onclick="reprintPrescription('${apt.id}')">🖨️ Reprint</button>
                </td>
              </tr>
            `;
          });
        }
      }
    }

    // --- Premise Form Handling ---
    window.editPremise = (id) => {
      const fac = ClinicStore.getPremises().find(f => f.id === id);
      if (!fac) return;
      document.getElementById("editPremiseId").value = fac.id;
      document.getElementById("newPremiseTag").value = fac.tag;
      document.getElementById("newPremiseTitle").value = fac.title;
      document.getElementById("newPremiseDesc").value = fac.desc;
      document.getElementById("newPremiseChecklist").value = fac.checklist || "";
      document.getElementById("premiseModalTitle").innerText = "Edit Hospital Premise Room";
      document.getElementById("premiseSubmitBtn").innerText = "Update Room Details";
      document.getElementById("premisePhotoHint").style.display = "block";
      document.getElementById("addPremiseModal").classList.add("active");
    };

    document.getElementById("addPremiseForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const editId = document.getElementById("editPremiseId").value;
      const photoFile = document.getElementById("newPremisePhotoFile").files[0];
      const photoDataUrl = await readFileAsDataURL(photoFile);

      if (editId) {
        const updatePayload = {
          tag: document.getElementById("newPremiseTag").value,
          title: document.getElementById("newPremiseTitle").value,
          desc: document.getElementById("newPremiseDesc").value,
          checklist: document.getElementById("newPremiseChecklist").value
        };
        if (photoDataUrl) updatePayload.img = photoDataUrl;
        ClinicStore.updatePremise(editId, updatePayload);
        showToast("Hospital room updated!");
      } else {
        ClinicStore.addPremise({
          tag: document.getElementById("newPremiseTag").value,
          title: document.getElementById("newPremiseTitle").value,
          desc: document.getElementById("newPremiseDesc").value,
          checklist: document.getElementById("newPremiseChecklist").value,
          img: photoDataUrl || "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=700&q=80"
        });
        showToast("Hospital room added!");
      }

      document.getElementById("addPremiseForm").reset();
      closeAddPremiseModal();
      renderAdminTables();
    });

    // --- Doctor Form Handling ---
    window.editDoctor = (id) => {
      const doc = ClinicStore.getDoctors().find(d => d.id === id);
      if (!doc) return;
      document.getElementById("editDocId").value = doc.id;
      document.getElementById("newDocName").value = doc.name;
      document.getElementById("newDocQual").value = doc.qualifications;
      document.getElementById("newDocTimings").value = doc.timings;
      document.getElementById("newDocRole").value = doc.role;
      document.getElementById("docModalTitle").innerText = "Edit Doctor Profile";
      document.getElementById("docSubmitBtn").innerText = "Update Doctor Profile";
      document.getElementById("addDocModal").classList.add("active");
    };

    document.getElementById("addDocForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const editId = document.getElementById("editDocId").value;
      const photoFile = document.getElementById("newDocPhotoFile").files[0];
      const photoDataUrl = await readFileAsDataURL(photoFile);

      if (editId) {
        const updatePayload = {
          name: document.getElementById("newDocName").value,
          qualifications: document.getElementById("newDocQual").value,
          timings: document.getElementById("newDocTimings").value,
          role: document.getElementById("newDocRole").value
        };
        if (photoDataUrl) updatePayload.img = photoDataUrl;
        ClinicStore.updateDoctor(editId, updatePayload);
        showToast("Doctor profile updated!");
      } else {
        ClinicStore.addDoctor({
          name: document.getElementById("newDocName").value,
          qualifications: document.getElementById("newDocQual").value,
          timings: document.getElementById("newDocTimings").value,
          role: document.getElementById("newDocRole").value,
          bio: "Consulting specialist at Sri Sai Skin & Hair Clinic, Hospet.",
          img: photoDataUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80"
        });
        showToast("Doctor profile added!");
      }

      document.getElementById("addDocForm").reset();
      closeAddDoctorModal();
      renderAdminTables();
    });

    // --- Treatment Form Handling ---
    window.editTreatment = (id) => {
      const trt = ClinicStore.getTreatments().find(t => t.id === id);
      if (!trt) return;
      document.getElementById("editTrtId").value = trt.id;
      document.getElementById("newTrtTitle").value = trt.title;
      document.getElementById("newTrtCategory").value = trt.category;
      document.getElementById("newTrtBadge").value = trt.badge || "";
      document.getElementById("newTrtDesc").value = trt.desc || "";
      document.getElementById("trtModalTitle").innerText = "Edit Clinical Treatment";
      document.getElementById("trtSubmitBtn").innerText = "Update Treatment";
      document.getElementById("addTrtModal").classList.add("active");
    };

    document.getElementById("addTrtForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const editId = document.getElementById("editTrtId").value;
      const trtData = {
        title: document.getElementById("newTrtTitle").value,
        category: document.getElementById("newTrtCategory").value,
        badge: document.getElementById("newTrtBadge").value,
        desc: document.getElementById("newTrtDesc").value
      };

      if (editId) {
        ClinicStore.updateTreatment(editId, trtData);
        showToast("Treatment updated!");
      } else {
        ClinicStore.addTreatment(trtData);
        showToast("Treatment added!");
      }

      document.getElementById("addTrtForm").reset();
      closeAddTreatmentModal();
      renderAdminTables();
    });

    // --- Result Form Handling ---
    window.editResult = (id) => {
      const res = ClinicStore.getResults().find(r => r.id === id);
      if (!res) return;
      document.getElementById("editResId").value = res.id;
      document.getElementById("newResTitle").value = res.title;
      document.getElementById("newResProc").value = res.procedure;
      document.getElementById("resModalTitle").innerText = "Edit Before & After Case Study";
      document.getElementById("resSubmitBtn").innerText = "Update Case Study";
      document.getElementById("resBeforeHint").style.display = "block";
      document.getElementById("resAfterHint").style.display = "block";
      document.getElementById("newResBeforeFile").required = false;
      document.getElementById("newResAfterFile").required = false;
      document.getElementById("addResModal").classList.add("active");
    };

    document.getElementById("addResForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const editId = document.getElementById("editResId").value;
      const beforeFile = document.getElementById("newResBeforeFile").files[0];
      const afterFile = document.getElementById("newResAfterFile").files[0];

      const beforeDataUrl = await readFileAsDataURL(beforeFile);
      const afterDataUrl = await readFileAsDataURL(afterFile);

      if (editId) {
        const updatePayload = {
          title: document.getElementById("newResTitle").value,
          procedure: document.getElementById("newResProc").value
        };
        if (beforeDataUrl) updatePayload.beforeImg = beforeDataUrl;
        if (afterDataUrl) updatePayload.afterImg = afterDataUrl;
        ClinicStore.updateResult(editId, updatePayload);
        showToast("Case study updated!");
      } else {
        ClinicStore.addResult({
          title: document.getElementById("newResTitle").value,
          procedure: document.getElementById("newResProc").value,
          beforeImg: beforeDataUrl,
          afterImg: afterDataUrl
        });
        showToast("Case study added!");
      }

      document.getElementById("addResForm").reset();
      closeAddResultModal();
      renderAdminTables();
    });

    // --- Preset Form Handling ---
    window.addPresetMedicineRow = () => {
      const tbody = document.getElementById("newPresetMedRows");
      if (!tbody) return;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="text" class="rx-input p-name" placeholder="Drug name" required /></td>
        <td><input type="text" class="rx-input p-dose" placeholder="e.g. 1 Tab" /></td>
        <td><input type="text" class="rx-input p-freq" placeholder="1-0-1" /></td>
        <td><input type="text" class="rx-input p-dur" placeholder="15 Days" /></td>
        <td><input type="text" class="rx-input p-inst" placeholder="After food" /></td>
        <td><button type="button" class="btn-del-row" onclick="this.closest('tr').remove()">✕</button></td>
      `;
      tbody.appendChild(tr);
    };

    document.getElementById("addPresetForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const rows = document.querySelectorAll("#newPresetMedRows tr");
      const meds = [];
      rows.forEach(r => {
        const name = r.querySelector(".p-name")?.value.trim();
        if (name) {
          meds.push({
            name: name,
            dosage: r.querySelector(".p-dose")?.value.trim() || "-",
            freq: r.querySelector(".p-freq")?.value.trim() || "-",
            duration: r.querySelector(".p-dur")?.value.trim() || "-",
            inst: r.querySelector(".p-inst")?.value.trim() || "-"
          });
        }
      });

      ClinicStore.saveDiseasePreset({
        diseaseName: document.getElementById("newPresetDisease").value.trim(),
        notes: document.getElementById("newPresetNotes").value.trim(),
        medicines: meds
      });

      document.getElementById("addPresetForm").reset();
      closeAddPresetModal();
      showToast("New Disease Protocol added!");
      renderAdminTables();
      renderDoctorQueue();
    });

    // --- Excel File Importer ---
    const fileInput = document.getElementById("excelFileInput");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file || typeof XLSX === "undefined") return;

        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const data = new Uint8Array(evt.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.SheetNames[0];
            const rows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);

            const grouped = {};
            rows.forEach(row => {
              const disease = row["Disease"] || row["disease"] || row["Condition"] || "General Dermatology";
              if (!grouped[disease]) {
                grouped[disease] = {
                  diseaseName: disease,
                  notes: row["Notes"] || row["notes"] || row["Diagnosis"] || "Standard clinical protocol.",
                  medicines: []
                };
              }
              const medName = row["Medicine"] || row["medicine"] || row["Tablet"] || row["Drug"];
              if (medName) {
                grouped[disease].medicines.push({
                  name: medName,
                  dosage: row["Dosage"] || row["dosage"] || "-",
                  freq: row["Frequency"] || row["freq"] || "-",
                  duration: row["Duration"] || row["duration"] || "-",
                  inst: row["Instructions"] || row["instructions"] || "-"
                });
              }
            });

            const parsedList = Object.values(grouped);
            if (parsedList.length > 0) {
              ClinicStore.bulkImportPresets(parsedList);
              showToast(`Imported ${parsedList.length} disease protocols from Excel!`);
              renderAdminTables();
              renderDoctorQueue();
            } else {
              showToast("No valid rows found in file.", "error");
            }
          } catch (err) {
            console.error(err);
            showToast("Failed to parse Excel file.", "error");
          }
        };
        reader.readAsArrayBuffer(file);
      });
    }

    // --- Website Logo Upload & Sync Helper ---
    window.uploadLogo = async () => {
      const fileInput = document.getElementById("logoFileInput");
      if (!fileInput || !fileInput.files[0]) {
        showToast("Please choose an image file first!", "error");
        return;
      }
      const dataUrl = await readFileAsDataURL(fileInput.files[0]);
      localStorage.setItem("sri_sai_clinic_logo", dataUrl);
      document.querySelectorAll(".brand-logo-circle").forEach(img => {
        img.src = dataUrl;
      });
      showToast("Clinic logo updated and synced across all pages!");
      fileInput.value = "";
    };

    // --- Deletion Helpers ---
    window.deletePreset = (name) => {
      if (confirm(`Delete protocol for ${name}?`)) {
        ClinicStore.deleteDiseasePreset(name);
        renderAdminTables();
        renderDoctorQueue();
      }
    };
    window.deletePremise = (id) => { ClinicStore.deletePremise(id); renderAdminTables(); };
    window.deleteDoc = (id) => { ClinicStore.deleteDoctor(id); renderAdminTables(); };
    window.deleteTrt = (id) => { ClinicStore.deleteTreatment(id); renderAdminTables(); };
    window.deleteRes = (id) => { ClinicStore.deleteResult(id); renderAdminTables(); };

    // --- Render Admin Tables ---
    function renderAdminTables() {
      // 1. Presets
      const presetBody = document.getElementById("adminPresetsBody");
      if (presetBody) {
        const presets = ClinicStore.getDiseasePresets();
        presetBody.innerHTML = presets.map(p => `
          <tr>
            <td><strong>${p.diseaseName}</strong></td>
            <td><small style="color:#555;">${p.notes}</small></td>
            <td><small>${p.medicines.map(m => m.name).join(", ") || 'No tablets'}</small></td>
            <td><button class="btn-danger" onclick="deletePreset('${p.diseaseName}')">Delete</button></td>
          </tr>
        `).join('');
      }

      // 2. Hospital Premises
      const premiseBody = document.getElementById("adminPremisesBody");
      if (premiseBody) {
        const premises = ClinicStore.getPremises();
        premiseBody.innerHTML = premises.map(f => `
          <tr>
            <td><span class="badge badge-confirmed">${f.tag}</span></td>
            <td><strong>${f.title}</strong></td>
            <td><small style="color:#555;">${f.desc.substring(0, 70)}...</small></td>
            <td>
              <button class="btn-outline" style="padding:4px 8px; font-size:0.75rem; margin-right:4px;" onclick="editPremise('${f.id}')">Edit</button>
              <button class="btn-danger" onclick="deletePremise('${f.id}')">Delete</button>
            </td>
          </tr>
        `).join('');
      }

      // 3. Doctors
      const docBody = document.getElementById("adminDoctorsBody");
      if (docBody) {
        const docs = ClinicStore.getDoctors();
        docBody.innerHTML = docs.map(d => `
          <tr>
            <td><strong>${d.name}</strong></td>
            <td>${d.qualifications}</td>
            <td>${d.timings}</td>
            <td>
              <button class="btn-outline" style="padding:4px 8px; font-size:0.75rem; margin-right:4px;" onclick="editDoctor('${d.id}')">Edit</button>
              <button class="btn-danger" onclick="deleteDoc('${d.id}')">Delete</button>
            </td>
          </tr>
        `).join('');
      }

      // 4. Treatments
      const trtBody = document.getElementById("adminTreatmentsBody");
      if (trtBody) {
        const trts = ClinicStore.getTreatments();
        trtBody.innerHTML = trts.map(t => `
          <tr>
            <td><strong>${t.title}</strong></td>
            <td>${t.category}</td>
            <td>${t.badge || '-'}</td>
            <td>
              <button class="btn-outline" style="padding:4px 8px; font-size:0.75rem; margin-right:4px;" onclick="editTreatment('${t.id}')">Edit</button>
              <button class="btn-danger" onclick="deleteTrt('${t.id}')">Delete</button>
            </td>
          </tr>
        `).join('');
      }

      // 5. Results
      const resBody = document.getElementById("adminResultsBody");
      if (resBody) {
        const res = ClinicStore.getResults();
        resBody.innerHTML = res.map(r => `
          <tr>
            <td><strong>${r.title}</strong></td>
            <td>${r.procedure}</td>
            <td>
              <button class="btn-outline" style="padding:4px 8px; font-size:0.75rem; margin-right:4px;" onclick="editResult('${r.id}')">Edit</button>
              <button class="btn-danger" onclick="deleteRes('${r.id}')">Delete</button>
            </td>
          </tr>
        `).join('');
      }
    }

    renderDoctorQueue();
    renderAdminTables();
  }
});
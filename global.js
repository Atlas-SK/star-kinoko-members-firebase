// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf5tFtV2qoCApiJMPmA7mX7pkmw8qj7Zs",
  authDomain: "star-kinoko-members.firebaseapp.com",
  projectId: "star-kinoko-members",
  storageBucket: "star-kinoko-members.firebasestorage.app",
  messagingSenderId: "192588219568",
  appId: "1:192588219568:web:d1c4887210eae73b0fa775"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch and Render Members
async function fetchMembers() {
    const activeMembersRef = collection(db, "activeMembers");
    const retiredMembersRef = collection(db, "retiredMembers");

    const activeMembersSnapshot = await getDocs(activeMembersRef);
    const retiredMembersSnapshot = await getDocs(retiredMembersRef);

    renderTable("ActiveMembers", activeMembersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    renderTable("RetiredMembers", retiredMembersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
}

// Save a Member
async function saveMember(member, collectionName) {
    const membersRef = collection(db, collectionName);

    if (member.id) {
        // Update existing member
        const memberDoc = doc(db, collectionName, member.id);
        await updateDoc(memberDoc, member);
    } else {
        // Add new member
        await addDoc(membersRef, member);
    }
    fetchMembers();
}

// Delete a Member
async function deleteMember(id, collectionName) {
    const memberDoc = doc(db, collectionName, id);
    await deleteDoc(memberDoc);
    fetchMembers();
}

// Render Tables
function renderTable(tableName, data) {
    const tbody = document.getElementById(`atlas-${tableName.toLowerCase()}-body`);
    tbody.innerHTML = "";

    data.forEach(member => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${member.name}</th>
            <td>${member.playerID}</td>
            <td>${member.level}</td>
            <td>${addCommas(member.earnings)}</td>
            <td>${addCommas(member.fellowPower)}</td>
            <td>${addCommas(member.highestFellow)}</td>
            <td>${addCommas(member.lowestFellow)}</td>
            <td>
                <button class="atlas-edit-btn">Edit</button>
                <button class="atlas-manage-btn">${tableName === "ActiveMembers" ? "Retire" : "Reinstate"}</button>
                <button class="atlas-delete-btn">Delete</button>
                <div>Added: ${formatDate(member.added)}</div>
                <div>Last Edited: ${formatDate(member.lastEdited)}</div>
                ${tableName === "RetiredMembers" ? `<div>Retired On: ${formatDate(member.retiredOn)}</div>` : ""}
            </td>
        `;

        // Add Event Listeners
        row.querySelector(".atlas-edit-btn").addEventListener("click", () => openModal(member, tableName));
        row.querySelector(".atlas-manage-btn").addEventListener("click", () => moveMember(member, tableName));
        row.querySelector(".atlas-delete-btn").addEventListener("click", () => deleteMember(member.id, tableName));

        tbody.appendChild(row);
    });
}

// Add Commas to Numbers
function addCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format Dates
function formatDate(dateString) {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
}

// Open and Close Modal
function openModal(member = {}, tableName) {
    const modal = document.getElementById("atlas-member-modal");
    const form = document.getElementById("atlas-member-form");

    form.dataset.tableName = tableName;
    form.dataset.editingId = member.id || "";
    form["player-name"].value = member.name || "";
    form["player-id"].value = member.playerID || "";
    form["player-level"].value = member.level || "";
    form["earnings"].value = member.earnings || "";
    form["total-fellow-power"].value = member.fellowPower || "";
    form["highest-fellow"].value = member.highestFellow || "";
    form["lowest-fellow"].value = member.lowestFellow || "";

    modal.hidden = false;
}

function closeModal() {
    const modal = document.getElementById("atlas-member-modal");
    modal.hidden = true;
}

document.getElementById("atlas-cancel-modal-btn").addEventListener("click", closeModal);

document.getElementById("atlas-save-member-btn").addEventListener("click", async (event) => {
    event.preventDefault();
    const form = document.getElementById("atlas-member-form");
    const tableName = form.dataset.tableName;

    const member = {
        id: form.dataset.editingId || null,
        name: form["player-name"].value,
        playerID: form["player-id"].value,
        level: parseInt(form["player-level"].value, 10),
        earnings: parseInt(form["earnings"].value.replace(/,/g, ""), 10),
        fellowPower: parseInt(form["total-fellow-power"].value.replace(/,/g, ""), 10),
        highestFellow: parseInt(form["highest-fellow"].value.replace(/,/g, ""), 10),
        lowestFellow: parseInt(form["lowest-fellow"].value.replace(/,/g, ""), 10),
        added: form.dataset.editingId ? form.dataset.addedDate : new Date().toISOString(),
        lastEdited: new Date().toISOString(),
        retiredOn: tableName === "RetiredMembers" ? new Date().toISOString() : null,
    };

    await saveMember(member, tableName);
    closeModal();
});

fetchMembers();

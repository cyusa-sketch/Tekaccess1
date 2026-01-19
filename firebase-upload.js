/* =========================================
   FIREBASE SHARED UPLOAD LOGIC
   - Image compression
   - Firebase Storage upload
   - Upload progress %
   - Auto-delete support (via storagePath)
========================================= */

/* ---------- IMAGE COMPRESSION ---------- */
window.compressImage = async function (file, maxWidth = 1600, quality = 0.75) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const scale = Math.min(maxWidth / img.width, 1);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        blob => resolve(blob),
        "image/jpeg",
        quality
      );
    };
  });
};

/* ---------- FIREBASE STORAGE UPLOAD ---------- */
window.uploadImage = async function (type) {
  const cap = type.charAt(0).toUpperCase() + type.slice(1);

  const fileInput = document.getElementById(`modal${cap}ImageFile`);
  const status = document.getElementById(`${type}UploadStatus`);
  const preview = document.getElementById(`modal${cap}Preview`);
  const hidden = document.getElementById(`modal${cap}ImageUrl`);

  if (!fileInput || !fileInput.files[0]) {
    status.innerHTML = "<span style='color:red'>Please select an image first</span>";
    return;
  }

  status.innerHTML = "Compressing image...";

  const compressed = await compressImage(fileInput.files[0]);
  const storagePath = `${type}s/${Date.now()}_${fileInput.files[0].name}`;
  const storageRef = firebase.storage().ref(storagePath);

  const uploadTask = storageRef.put(compressed);

  uploadTask.on(
    "state_changed",
    snapshot => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      status.innerHTML = `Uploading… ${percent}%`;
    },
    error => {
      console.error(error);
      status.innerHTML = "<span style='color:red'>Upload failed</span>";
    },
    async () => {
      const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

      hidden.value = downloadURL;
      hidden.dataset.path = storagePath;

      preview.src = downloadURL;
      preview.style.display = "block";

      status.innerHTML =
        "<span style='color:green'>✔ Upload successful</span>";
    }
  );
};

/* ---------- AUTO DELETE HELPER ---------- */
window.deleteStorageByPath = async function (path) {
  if (!path) return;
  try {
    await firebase.storage().ref(path).delete();
  } catch (e) {
    console.warn("Storage file already removed");
  }
};

/* ================= IMAGE PREVIEW ================= */

function bindImagePreview(fileInputId, previewImgId) {
  const fileInput = document.getElementById(fileInputId);
  const previewImg = document.getElementById(previewImgId);

  if (!fileInput || !previewImg) return;

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindImagePreview("modalServiceImageFile", "modalServicePreview");
  bindImagePreview("modalTeamImageFile", "modalTeamPreview");
  bindImagePreview("modalBlogImageFile", "modalBlogPreview");
});
/* ================= END OF FILE ================= */
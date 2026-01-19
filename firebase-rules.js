rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to all content collections
    match /services/{service} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /team/{member} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /partners/{partner} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /blog/{post} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /website/{page} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Admin collection - requires authentication
    match /admin/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Temporary test collection (can be removed)
    match /_test/{document} {
      allow read, write: if true;
    }
  }
}
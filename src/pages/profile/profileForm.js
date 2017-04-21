var ProfileForm = (function () {
    function ProfileForm(firstName, lastName, bio, displayName, birthDate, localPath) {
        if (firstName === void 0) { firstName = ''; }
        if (lastName === void 0) { lastName = ''; }
        if (bio === void 0) { bio = ''; }
        if (displayName === void 0) { displayName = ''; }
        if (birthDate === void 0) { birthDate = ''; }
        if (localPath === void 0) { localPath = ''; }
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
        this.displayName = displayName;
        this.birthDate = birthDate;
        this.localPath = localPath;
    }
    return ProfileForm;
}());
export { ProfileForm };
//# sourceMappingURL=profileForm.js.map
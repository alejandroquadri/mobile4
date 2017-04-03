export class ProfileForm {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public bio: string = '',
    public displayName: string = '',
    public birthDate: string = '',
    public localPath: string = ''
  ) {}
}

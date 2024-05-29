class LocalStorageService {
  private static instance: LocalStorageService;

  private constructor() {}

  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  setUserData(userData: { name: string; email: string }): void {
    localStorage.setItem('user-data', JSON.stringify(userData));
  }

  setToken(token:string):void{
    localStorage.setItem('user-token',token);

  }

  getToken():string|null{
    return localStorage.getItem('user-token');
  }

  removeToken(){
    return localStorage.removeItem('user-token');

  }



  getUserData(): { name: string; email: string } | null {
    const data = localStorage.getItem('user-data');
    return data ? JSON.parse(data) : null;
  }

  clearUserData(): void {
    localStorage.removeItem('user-data');
  }
}

export default LocalStorageService.getInstance();

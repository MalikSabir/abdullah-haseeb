import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  public host=window.location.hostname;
  public port = window.location.port;
  constructor(private http :HttpClient, private router : Router) { }

  private _signup = "http://"+this.host+":3000/api/signup";
  private _signin = "http://"+this.host+":3000/api/signin";

  private _addPduct = "http://"+this.host+":3000/api/addProduct";
  private _getAllProduct = "http://"+this.host+":3000/api/getAllProduct";
  private _getProduct = "http://"+this.host+":3000/api/getProduct";
  private _deleteProduct = "http://"+this.host+":3000/api/deleteProduct";
  private _getTeam = "http://"+this.host+":3000/api/getTeam";

 
  

  signup(email: string, password: string){
    return this.http.post<any>(this._signup,{email, password})} 
  signin(email: string, password: string){
    return this.http.post<any>(this._signin,{email, password})} 

    getAllProduct(company: string){
      return this.http.post<any>(this._getAllProduct,{company})
    }
    getTeam(){
      return this.http.get<any>(this._getTeam)
    }
    
    getProduct(company: string, category: string){
      return this.http.post<any>(this._getProduct,{company, category})
    }
    
  addProduct(name: string,brand_name: string, company: string, category: string,ingeridents: string,formulation: string,spectrum: string,pest: string, image: File){
    const addProjectData = new FormData;
    addProjectData.append('name', name);
    addProjectData.append('brand_name', brand_name);
    addProjectData.append('company', company);
    addProjectData.append('category', category);
    addProjectData.append('ingeridents', ingeridents);
    addProjectData.append('formulation', formulation);
    addProjectData.append('spectrum', spectrum);
    addProjectData.append('pest', pest);
    addProjectData.append('image', image, name);
    return this.http.post<any>(this._addPduct, addProjectData);
  }
  deleteProduct(id: string, imgUrl: string){
    console.log("yes i am deleting image and id"+id, imgUrl);
    return this.http.post<any>(this._deleteProduct, {id, imgUrl})
  }  



}

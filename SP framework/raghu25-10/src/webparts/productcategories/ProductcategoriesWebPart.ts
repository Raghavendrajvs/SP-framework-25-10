import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ProductcategoriesWebPart.module.scss';
import * as strings from 'ProductcategoriesWebPartStrings';
import * as $ from 'jquery';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';


export interface IProductcategoriesWebPartProps {
  description: string;
}

export default class ProductcategoriesWebPart extends BaseClientSideWebPart<IProductcategoriesWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.productcategories }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>    
      </div>
      <div id="lists"> 
      <select id="catdd"> </select> 
      </div>
      <div id="Products">  </div>`;
     // this.getListsInfo();
     // $(document).ready(function () {
 
        this.getListsInfo();
        this.getproductsinfo();
    // });
      
   }

  // private getListsInfo() {
    // let html: string = 'Category:<select id="CatDD">';
    // if (Environment.type === EnvironmentType.Local) {
    //   this.domElement.querySelector('#lists').innerHTML = "Sorry this does not work in local workbench";
    // } else {
    // this.context.spHttpClient.get
    // (
    //   this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getByTitle('Category')/items?$select=Title,ID`, 
    //   SPHttpClient.configurations.v1)
    //   .then((response: SPHttpClientResponse) => {
    //     response.json().then((listsObjects: any) => {
    //       listsObjects.value.forEach(listObject => {
    //         html += `
           
    //                  <option value="${listObject.Title}">${listObject.Title}</option>
    //               `;
    //       });
    //       this.domElement.querySelector('#lists').innerHTML = html+'</select>';
    //     });
    //   });        
    // }
    // }
  // }


  
 getListsInfo() 
 {
    var call1 = jQuery.ajax({
        url: this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('Category')/items?$select=Title,ID",
        type: "GET",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose"
        }
    });
   
    call1.done(function (data) {
      $("#catdd option").remove();
      var message = jQuery("#catdd");
      jQuery.each(data.d.results, function (index, value) {
        message.append($("<option></option>")
        .attr("value", value.Title)
        .text(value.Title));
    });
  });
  
    call1.fail(function (jqXHR, textStatus, errorThrown) {
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        alert("Call failed. Error: " + message);
    });
  }   


   private getproductsinfo(){
    alert("coming");
    document.getElementById("catdd").addEventListener("change",  ()=>this.getproddetails());
    alert("coming after");
   }

  // private getproddetails() {
  //   let html: string = '';
  //   var selectedvalue=document.getElementById("CatDD")["value"];
  //  //var selectedvalue="Clothing";
  //   alert(selectedvalue);
  //   if (Environment.type === EnvironmentType.Local) {
  //     this.domElement.querySelector('#Products').innerHTML = "Sorry this does not work in local workbench";
  //   } else {
  //   this.context.spHttpClient.get
  //   (
  //    this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getByTitle('Products')/items?$select=Title&$filter=Category/Title eq '${selectedvalue}'`, 
  //     SPHttpClient.configurations.v1)
  //     .then((response: SPHttpClientResponse) => {
  //       response.json().then((Proddetails: any) => {
  //         Proddetails.value.forEach(Proddetails => {
  //           html += `
  //                  <ul>
  //                       <li>
  //                           <span class="ms-font-l">${Proddetails.Title}</span>
  //                       </li>
  //                  </ul>
                    
  //                 `;
  //         });
  //         this.domElement.querySelector('#Products').innerHTML = html;
  //       });
  //     });        
  //   }
  // }

 private getproddetails() {
   var call1 = jQuery.ajax({
    url: this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('Products')/items?$select=Title&$filter=(Category/Title eq "+$('#catdd'),
    type: "GET",
    dataType: "json",
    headers: {
        Accept: "application/json;odata=verbose"
    }
  });

 
  call1.done(function (callback1) {
    $("#Products").remove();
    var message = jQuery("#Products");
    $.each(callback1.d.results, function (index, value) {
     message.append("Products are {0}" + value.Title ); 
      });
  });
  call1.fail(function (jqXHR, textStatus, errorThrown) {
    var response = JSON.parse(jqXHR.responseText);
    var message = response ? response.error.message.value : textStatus;
    alert("Call failed. Error: " + message);
  });
} 
  
   protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
 
 
}
// getproductsinfo()
 //  {
  //      this.domElement.querySelector('#Products').addEventListener('change',()=>this.ChangeRequest());
  //    }
 //   ChangeRequest()
  //    {
  //       alert("ChangeRequest");
   //      var a = $('#Products').val();
  //       alert("data :"+a)
  //    }

// <ul>
// <li>
//    <span class="ms-font-l">${listObject.Title}</span>
// </li>
// </ul>
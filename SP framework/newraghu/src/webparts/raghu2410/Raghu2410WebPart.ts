import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';


import styles from './Raghu2410WebPart.module.scss';
import * as strings from 'Raghu2410WebPartStrings';

import {IRaghu2410WebPartProps} from './RaghuProps';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class Raghu2410WebPart extends BaseClientSideWebPart<IRaghu2410WebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.raghu2410 }">
        <div class="${ styles.container }">
          <div class="${ styles.row }" style="background-color:${escape(this.properties.color)};">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <p class="${ styles.description }">${escape(this.properties.color)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="details">
      <p>Name : <input type='textbox' value='name'></p>
      <p>Gender :  
      <select> 
      <option value='male'>Male</option>
      <option value='female'>Female</option>
      </select>
      </p>
      <p> <input type='button' value='save'</p>
      </div>
      <div id="lists" style="background-color:yellow;"></div>`;
      this.getListsInfo();
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
                }),
                PropertyPaneDropdown('color',{
                  label:"drop down",
                  options:[
                    {key:"red",text:"red"},
                    {key:"blue",text:"blue"},
                    {key:"green",text:"green"}
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
  private getListsInfo() {
    let html: string = '';
    if (Environment.type === EnvironmentType.Local) {
      this.domElement.querySelector('#lists').innerHTML = "Sorry this does not work in local workbench";
    } else {
    this.context.spHttpClient.get
    (
      this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, 
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json().then((listsObjects: any) => {
          listsObjects.value.forEach(listObject => {
            html += `
                    <ul>
                        <li>
                            <span class="ms-font-l">${listObject.Title}</span>
                        </li>
                    </ul>`;
          });
          this.domElement.querySelector('#lists').innerHTML = html;
        });
      });        
    }
  }

}


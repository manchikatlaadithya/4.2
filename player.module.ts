import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlayerListComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

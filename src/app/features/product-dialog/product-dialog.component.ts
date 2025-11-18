import { Component, inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../material';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VentaService } from '../../services/venta.service';
import { PedidoService } from '../../services/pedido.service';



@Component({
  selector: 'app-product-dialog',
  imports: [
    ...MATERIAL_IMPORTS, 
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent {
  dialogTitle: string = 'New Product';

  readonly dialogRef = inject(MatDialogRef<ProductDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  public form!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService,
    private pedidoService: PedidoService,
    private snackBar: MatSnackBar
  ) {
    this.initFormBuilder();
    this.initFormData(this.data);
  }

  /**
   * Método para inicializar el formulario
   */
  private initFormBuilder() {
    this.form = this.fb.group({
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  private initFormData(data:any = {}) {
    if(data?.accion == 'pedir') {
      this.dialogTitle = 'Hacer pedido';
    }

    if(data?.accion == 'vender') {
      this.dialogTitle = 'Vender producto';
    }
  }
  
  getFormControl(control: string): AbstractControl {
    return this.form.controls[control];
  }

  mapErrors(control: AbstractControl, fieldName: string): Array<string> {
    let errors : Array<string> =  [];

    if(control.hasError('minlength') || control.hasError('maxlength')) {
      errors.push(`El campo ${fieldName} no cumple con la longitud`);
    }

    if(control.hasError('required')) {
      errors.push(`El campo ${fieldName} es obligatorio`);
    }

    if(control.hasError('min')) {
      errors.push(`El campo ${fieldName} no cumple con el valor mínimo`);
    }

    return errors;
  }

  close(result: string|null = null): void {
    this.dialogRef.close(result);
  }

  save(): void {

    const data = {
      productoId: this.data.id,
      cantidad: this.form.controls['cantidad'].value
    };

    if(this.data?.accion == 'vender') {
      this.ventaService.venderProducto(data).subscribe(
        (res:any) => {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000
          });
          this.close("OK");
        },
        (error:any) => {
          console.log(error);
          this.snackBar.open(error.error.message, 'Close', {
            duration: 3000
          });
        }
      );
    } 
    
    if(this.data?.accion == 'pedir') {
      this.pedidoService.hacerPedido(data).subscribe(
        (res:any) => {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000
          });
          this.close("OK");
        },
        (error:any) => {
          console.log(error);
          this.snackBar.open(error.error.message, 'Close', {
            duration: 3000
          });
        }
      );
    }
  }
}

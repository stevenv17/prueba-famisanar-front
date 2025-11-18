import { Component, inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../material';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  readonly dialog = inject(MatDialog);

  dataSource = [];
  displayedColumns: string[] = ['nombre', 'cantidad', 'iva', 'precio', 'pedido', 'operaciones'];

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.getProductList();
  }

  openDialog(data = {}): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '800px',
      height: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result === "OK") {
        this.getProductList();
      }
    });
  }

  getProductList() {
    this.productService.getProductsList().subscribe(
      (res:any) => {
        this.dataSource = res;
      },
      (error:any) => {
        console.log(error);
        this.snackBar.open(error.error.message, 'Close', {
          duration: 3000
        });
      }
    );
  }

  hacerPedido(productId: number) {
    this.openDialog({id: productId, accion: 'pedir'});
  }

  venderProducto(productId: number) {
    this.openDialog({id: productId, accion: 'vender'});
  }
}

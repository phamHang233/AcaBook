import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  orders!: Order;
  numOrder!: Number;
  uniqueCustomerIds!: Number;
  orderCounts: { [date: string]: number } = {};
  orderPrice: { [date: string]: number } = {};


  totalPrice!: number;
  @ViewChild('chartCanvasOrder') chartCanvasOrder: ElementRef | undefined;
  @ViewChild('chartCanvasPrice') chartCanvasPrice: ElementRef | undefined;

  lineChart: Chart | undefined;
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
  ) {

  }
  ngOnInit() {
    const body = document.querySelector("body")!;

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll(".sidebar .sidebar-item").forEach(function (el) {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
    this.orderService.getAllOrder().subscribe(data => {
      if (data != undefined) {

        this.numOrder = data.length; // Đếm tổng số bản ghi từ mảng dữ liệu trả về
        this.uniqueCustomerIds = [...new Set(data.map(order => order.customer_id))].length;
        this.totalPrice = data.reduce((total, order) => total + order.price, 0);
        this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
        data.forEach(order => {
          const orderDate = new Date(order.order_purchase_timestamp);
          const monthYear = orderDate.getMonth() + 1 + '-' + orderDate.getFullYear();
          if (this.orderCounts[monthYear]) {
            this.orderCounts[monthYear]++;
            this.orderPrice[monthYear] += Math.ceil(order.price);
          } else {
            this.orderCounts[monthYear] = 1;
            this.orderPrice[monthYear] = Math.ceil(order.price);

          }
        });
        // console.log(this.orderCounts)
        this.createChart();
      }
    }
    )
  }



  logout() {
    this.authService.logout()

  }

  createChart() {
    if (this.chartCanvasOrder) {
      const chartElement = this.chartCanvasOrder.nativeElement;
      const ctx = chartElement.getContext('2d');
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', "Tháng Tám"],
          datasets: [
            {
              label: 'Số đơn hàng',
              data: [this.orderCounts["1-2023"], this.orderCounts["2-2023"], this.orderCounts["3-2023"], this.orderCounts["4-2023"], this.orderCounts["5-2023"], this.orderCounts["6-2023"], this.orderCounts["7-2023"], this.orderCounts["8-2023"]],
              borderColor: 'rgb(75, 192, 192)',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Số lượng đơn' // Đặt tên cho trục Y
              },

            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Số lượng đơn đặt hàng' // Đặt tiêu đề ở đây
            },


          }
        }
      });

    }


    if (this.chartCanvasPrice) {
      const chartElement = this.chartCanvasPrice.nativeElement;
      const ctx = chartElement.getContext('2d');
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', "Tháng Tám"],
          datasets: [
            {
              label: 'Thu nhập',
              data: [this.orderPrice["1-2023"], this.orderPrice["2-2023"], this.orderPrice["3-2023"], this.orderPrice["4-2023"], this.orderPrice["5-2023"], this.orderPrice["6-2023"], this.orderPrice["7-2023"], this.orderPrice["8-2023"]],
              borderColor: 'rgb(255, 102, 102)',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Doanh thu (USD)' // Đặt tên cho trục Y
              },
              ticks: {
                callback: function (value, index, values) {
                  return '$' + value; // Thêm tiền tố "$" vào giá trị
                }
              }

            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Tổng doanh thu' // Đặt tiêu đề ở đây
            }
          }
        }
      });

    }
  }
}

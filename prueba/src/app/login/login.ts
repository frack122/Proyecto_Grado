import { Component, signal, inject } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);

  hide = signal(true);

  // Definición del formulario que usas en el HTML
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onLogin(event: Event) {
  event.preventDefault();

  if (this.loginForm.valid) {

    const data = this.loginForm.value;

    console.log("📤 Enviando:", data);

    this.http.post('http://192.168.100.23:5183/api/auth/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .subscribe({
      next: (res: any) => {
        console.log("✅ Respuesta del backend:", res);

        // Guardar token
        localStorage.setItem('token', res.token);

        // (Opcional) guardar datos del usuario
        localStorage.setItem('usuario', res.usuario);
        localStorage.setItem('correo', res.correo);

        // Redirigir
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.error("❌ Error completo:", err);

        if (err.status === 0) {
          alert("❌ No conecta con el backend (revisa que esté corriendo y HTTPS)");
        } else if (err.status === 401) {
          alert("❌ Usuario o contraseña incorrectos");
        } else if (err.status === 415) {
          alert("❌ Error: formato JSON incorrecto");
        } else if (err.status === 405) {
          alert("❌ Método no permitido (debe ser POST)");
        } else {
          alert("❌ Error inesperado del servidor");
        }
      }
    });

  } else {
    alert("⚠️ Completa el formulario correctamente");
  }
}
}
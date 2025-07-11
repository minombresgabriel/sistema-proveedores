using Microsoft.EntityFrameworkCore;
using UnicasaProveedoresWeb.Models;

var builder = WebApplication.CreateBuilder(args);

// Registrar el contexto de la base de datos
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registrar controladores
builder.Services.AddControllers();

// Configurar Swagger para documentación de API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });

    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configurar el pipeline de la aplicación
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowAllOrigins"); // Permitir todos los orígenes en desarrollo
}
else
{
    app.UseExceptionHandler("/error");
    app.UseCors("AllowSpecificOrigin"); // Permitir solo el origen específico en producción
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
package main

import (
	"net/http"

	"github.com/guardian/automat/store"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	store := store.MemoryStore{}
	store.Init()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Gzip())

	e.GET("/admin/slots", hello)
	e.GET("/admin/slots/:slotID", hello)
	e.PATCH("/admin/slots/:slotID", hello)
	e.GET("/admin/variants", getVariants(store))
	e.POST("/slots", hello)

	e.Logger.Fatal(e.Start(":3030"))
}

// Handler
func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}

// TODO with errors: log them, return something useful

func getVariants(store store.VariantStore) echo.HandlerFunc {
	return func(c echo.Context) error {
		variants, err := store.GetVariants()
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, variants)
	}
}

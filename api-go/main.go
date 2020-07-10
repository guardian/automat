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

	e.GET("/admin/slots", getSlots(store))
	e.GET("/admin/slots/:id", getSlot(store))
	e.PATCH("/admin/slots/:id", hello)
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
func getSlots(store store.SlotStore) echo.HandlerFunc {
	return func(c echo.Context) error {
		slots, err := store.GetSlots()
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, slots)
	}
}

func getSlot(store store.SlotStore) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		slot, err := store.GetSlot(id)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, slot)
	}
}

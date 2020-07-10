package main

import (
	"net/http"

	"github.com/guardian/automat/store"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	s := store.MemoryStore{}
	s.Init()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Gzip())

	e.GET("/admin/slots", getSlots(&s))
	e.GET("/admin/slots/:id", getSlot(&s))
	e.PATCH("/admin/slots/:id", updateSlot(&s))
	e.GET("/admin/variants", getVariants(s))
	e.POST("/slots", getSlotMap(&s))

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
func getSlots(s store.SlotStore) echo.HandlerFunc {
	return func(c echo.Context) error {
		slots, err := s.GetSlots()
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, slots)
	}
}

func getSlot(s store.SlotStore) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		slot, err := s.GetSlot(id)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, slot)
	}
}

type slotPatch struct {
	Tests []store.Test `json:"tests"`
}

func updateSlot(s store.SlotStore) echo.HandlerFunc {
	return func(c echo.Context) error {
		patch := slotPatch{}
		id := c.Param("id")

		if err := c.Bind(patch); err != nil {
			return err
		}

		slot, err := s.GetSlot(id)
		if err != nil {
			return err
		}

		slot.Tests = patch.Tests
		err = s.UpdateSlot(id, slot)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, slot)
	}
}

func getSlotMap(s store.SlotStore) echo.HandlerFunc {
	return func(c echo.Context) error {
		slots, err := s.GetSlots()
		if err != nil {
			return err
		}

		// TODO (obviously) select test properly
		slot := slots[0]
		configuration := map[string]store.Test{slot.ID: slot.Tests[0]}

		return c.JSON(http.StatusOK, configuration)
	}
}

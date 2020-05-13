package main

import (
	"automat-api/store"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Profile describes which components should be placed in which slots
type Profile struct {
	Slots map[string]string
}

func main() {
	r := gin.Default()
	s := store.MemoryStore{}
	s.InitTestData()

	slots := r.Group("/slots")
	{
		slots.POST("/", func(c *gin.Context) {
			var t store.Targeting
			if err := c.ShouldBindJSON(&t); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			matching := s.GetMatching(t)
			variant := matching[0].Variants[0] // TODO make this do stuff
			c.JSON(http.StatusOK, gin.H{"slotA": variant})
		})
	}

	admin := r.Group("/admin")
	{
		admin.GET("/tests", func(c *gin.Context) {
			tests := s.GetAll()
			c.JSON(200, tests)
		})
	}

	r.Run()
}

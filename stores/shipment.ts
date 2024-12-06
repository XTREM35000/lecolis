import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import type { CreateShipmentInput } from '@/server/utils/validation'

export interface Shipment {
  id: string
  trackingNumber: string
  recipient: {
    name: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      state: string
      country: string
      postalCode: string
    }
  }
  dimensions: {
    length: number
    width: number
    height: number
    weight: number
  }
  status: 'pending' | 'in_transit' | 'delivered' | 'failed'
  createdAt: string
  updatedAt: string
}

export interface ShipmentStats {
  activeShipments: number
  deliveredToday: number
  deliveryRate: number
  pendingPickups: number
}

interface ShipmentState {
  shipments: Shipment[]
  stats: ShipmentStats
  loading: boolean
}

export const useShipmentStore = defineStore('shipment', {
  state: (): ShipmentState => ({
    shipments: [],
    stats: {
      activeShipments: 0,
      deliveredToday: 0,
      deliveryRate: 0,
      pendingPickups: 0
    },
    loading: false
  }),

  actions: {
    async fetchShipments() {
      this.loading = true
      try {
        const { data } = await useFetch('/api/shipments')
        if (data.value) {
          this.shipments = data.value.shipments
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch shipments')
      } finally {
        this.loading = false
      }
    },

    async fetchStats() {
      try {
        const { data } = await useFetch('/api/shipments/stats')
        if (data.value) {
          this.stats = data.value
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch stats')
      }
    },

    async createShipment(shipmentData: CreateShipmentInput) {
      try {
        const { data, error } = await useFetch('/api/shipments/create', {
          method: 'POST',
          body: shipmentData
        })

        if (error.value) throw error.value

        if (data.value) {
          this.shipments.unshift(data.value.shipment)
          toast.success('Shipment created successfully')
          return true
        }
        return false
      } catch (error: any) {
        toast.error(error.message || 'Failed to create shipment')
        return false
      }
    }
  },

  getters: {
    recentShipments: (state) => {
      return [...state.shipments]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
    }
  }
})
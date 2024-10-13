import React from "react"
import { render } from "@testing-library/react"
import { setupStore } from "../store"
import { Provider } from "react-redux"

export function renderWithProviders(ui, extendedRenderOptions = {}) {
    const {
        preloadedState = {
            foodItems: [],
            isLoading: false,
            foodItemById: {},
            error: null,
            sortDirection: true, // true -> accending, false -> descending
            isModalOpen: false, // handle modal open & close(by default close)
            idToFilter: null,
            pageNo: 0
        },
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions

    const Wrapper = ({ children }) => (
        <Provider store={store}>{children}</Provider>
    )

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions })
    }
}
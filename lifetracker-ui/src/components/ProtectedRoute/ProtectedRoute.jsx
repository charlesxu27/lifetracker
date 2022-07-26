import * as React from "react"
import { useAuthContext } from "../../contexts/auth"
import AccessForbidden from "../AccessForbidden/AccessForbidden"

export default function ProtectedRoute( {element} ) {
  const { initialized, user } = useAuthContext()

  if (user?.email) {
  return (
    element
  )} else {
    return (
      <AccessForbidden />
    )
  }
}
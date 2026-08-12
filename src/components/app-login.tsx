import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle, } from "./ui/field"
import React from "react"
import { Input } from "./ui/input"


export function AppLogin() {
    return (

        <div className="login">
            <FieldSet className="w-150 max-w-lg">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <Input id="username" type="text" placeholder="Max Leiter" />
                        <FieldDescription>
                            Choose a unique username for your account.
                        </FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <FieldDescription>
                            Must be at least 8 characters long.
                        </FieldDescription>
                        <Input id="password" type="password" placeholder="••••••••" />
                    </Field>
                </FieldGroup>
            </FieldSet>
        </div>
    )
}

/*<Button variant="default" size="default"><CircleFadingArrowUpIcon /></Button>*/
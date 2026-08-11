import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle, } from "@/components/ui/field"
import { Input } from "@base-ui/react/input"
import React from "react"


export function AppLogin() {
    return (
        <FieldSet className="w-full max-w-xs">
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
    )
}

/*<Button variant="default" size="default"><CircleFadingArrowUpIcon /></Button>*/
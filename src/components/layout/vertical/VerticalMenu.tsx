// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, SubMenu, MenuSection } from '@menu/vertical-menu'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useRole } from '@/contexts/roleContext'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Menu Data Imports
// import menuData from '@/data/navigation/verticalMenuData'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()
  const { role } = useRole()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href={`/${locale}/dashboards/analytics`} icon={<i className='tabler-smart-home' />}>
          Dashboard
        </MenuItem>
        {role === 'property-manager' && (
          <>
            <MenuSection label='Property Manager'>
              <SubMenu label='Properties' icon={<i className='tabler-building' />}>
                <MenuItem href={`/${locale}/properties/list`}>List of Properties</MenuItem>
                <MenuItem href={`/${locale}/add-property`}>Add Property</MenuItem>
              </SubMenu>
              <MenuItem href={`/${locale}/property-owners`} icon={<i className='tabler-home-hand' />}>
                Property Owners
              </MenuItem>
              <MenuItem href={`/${locale}/reviews`} icon={<i className='tabler-star' />}>
                Reviews
              </MenuItem>
              <MenuItem href={`/${locale}/inventory/list`} icon={<i className='tabler-packages' />}>
                Inventory
              </MenuItem>
            </MenuSection>
            <MenuSection label='Tenancy Management'>
              <MenuItem href={`/${locale}/reports`} icon={<i className='tabler-report-analytics' />}>
                Reports
              </MenuItem>
              <MenuItem href={`/${locale}/rental-properties`} icon={<i className='tabler-home-dollar' />}>
                Rental Properties
              </MenuItem>
              <MenuItem href={`/${locale}/tenants`} icon={<i className='tabler-users' />}>
                Tenants
              </MenuItem>
              <MenuItem href={`/${locale}/contracts/list`} icon={<i className='tabler-file-text' />}>
                My Contracts
              </MenuItem>
              <MenuItem href={`/${locale}/rental-calculator`} icon={<i className='tabler-calculator' />}>
                Rental Calculator
              </MenuItem>
            </MenuSection>
            <MenuSection label='Short Term Management'>
              <MenuItem href={`/${locale}/guests`} icon={<i className='tabler-user-check' />}>
                Guests
              </MenuItem>
              <MenuItem href={`/${locale}/bookings`} icon={<i className='tabler-calendar-event' />}>
                Bookings
              </MenuItem>
            </MenuSection>
            <MenuSection label='CRM'>
              <MenuItem href={`/${locale}/enquiries`} icon={<i className='tabler-message-circle' />}>
                Enquiries
              </MenuItem>
              <MenuItem href={`/${locale}/developers`} icon={<i className='tabler-crane' />}>
                Developers
              </MenuItem>
              <MenuItem href={`/${locale}/projects`} icon={<i className='tabler-briefcase' />}>
                Projects
              </MenuItem>
              <MenuItem href={`/${locale}/leads`} icon={<i className='tabler-target-arrow' />}>
                Leads
              </MenuItem>
            </MenuSection>
            <MenuSection label='Finances'>
              <MenuItem href={`/${locale}/transactions`} icon={<i className='tabler-arrows-exchange' />}>
                Transactions
              </MenuItem>
              <MenuItem href={`/${locale}/ledger-pm`} icon={<i className='tabler-book' />}>
                Ledger PM
              </MenuItem>
              <MenuItem href={`/${locale}/ledger-po`} icon={<i className='tabler-book-2' />}>
                Ledger PO
              </MenuItem>
              <MenuItem href={`/${locale}/financial-statement`} icon={<i className='tabler-file-dollar' />}>
                Financial Statement
              </MenuItem>
            </MenuSection>
          </>
        )}
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu

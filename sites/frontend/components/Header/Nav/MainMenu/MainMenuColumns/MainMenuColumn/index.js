// @flow
import { styled, Component } from '@guardian/guui';

import { desktop, leftCol } from '@guardian/pasteup/breakpoints';

import MainMenuColumnButton from './MainMenuColumnButton';
import MainMenuColumnLinks from './MainMenuColumnLinks';

import type { ColumnType } from '../../../../Nav/__config__';

const MainMenuColumnStyled = styled('li')(({ isPillar }) => {
    const styles = {
        fontSize: 18,
        listStyle: 'none',
        margin: 0,
        padding: '0 0 12px',
        [desktop]: {
            width: 118,
            float: 'left',
            position: 'relative',
        },
        [leftCol]: {
            width: 140,
        },
    };

    if (isPillar) {
        styles[desktop][':after'] = {
            content: '""',
            display: 'block',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: '#abc2c9',
        };
    }

    return styles;
});

type Props = { column: ColumnType };

export default class MainMenuColumn extends Component<
    Props,
    { showColumnLinks: boolean },
> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showColumnLinks: false,
        };
    }

    toggleColumnLinks() {
        this.setState({
            showColumnLinks: !this.state.showColumnLinks,
        });
    }

    render() {
        const { showColumnLinks } = this.state;
        const { column } = this.props;
        const isPillar = !!column.pillar;
        const subNavId = `${column.id}Links`;
        const ColumnButton = () => {
            if (isPillar) {
                return (
                    <MainMenuColumnButton
                        column={column}
                        showColumnLinks={showColumnLinks}
                        toggleColumnLinks={() => {
                            this.toggleColumnLinks();
                        }}
                        ariaControls={subNavId}
                    />
                );
            }
            return '';
        };

        return (
            <MainMenuColumnStyled role="none" isPillar={isPillar}>
                <ColumnButton />
                <MainMenuColumnLinks
                    column={column}
                    showColumnLinks={showColumnLinks}
                    id={subNavId}
                    isPillar={isPillar}
                />
            </MainMenuColumnStyled>
        );
    }
}

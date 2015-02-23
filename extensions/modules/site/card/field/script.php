<?php
/**
 * @package     Github.Module
 * @subpackage  Card.Field
 *
 * @copyright   Copyright (C) 2015 Roberto Segura López. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('_JEXEC') or die;

JLoader::import('phproberto.library');

// Register our own prefix
JLoader::registerPrefix('Github', dirname(__DIR__));

JFormHelper::loadFieldClass('hidden');

/**
 * Form Field to load a script through field
 *
 * @since  1.0
 */
class GithubFormFieldScript extends JFormFieldHidden
{
	/**
	 * The form field type.
	 *
	 * @var    string
	 * @since  1.0
	 */
	public $type = 'Script';

	/**
	 * Method to get the field input markup
	 *
	 * @return  string  The field input markup.
	 *
	 * @since   1.0
	 */
	protected function getInput()
	{
		if (!$this->loadBootstrap())
		{
			$this->loadJquery();
		}

		$script = isset($this->element['script']) ? (string) $this->element['script'] : null;

		if ($script)
		{
			$moduleInstance = new GithubModuleCard;

			$moduleInstance->loadScript($script);
		}

		return parent::getInput();
	}

	/**
	 * Load Bootstrap
	 *
	 * @return  boolean
	 */
	protected function loadBootstrap()
	{
		$loadBootstrap = isset($this->element['loadBootstrap']) ? true : false;

		if ($loadBootstrap)
		{
			JHtml::_('bootstrap.framework');

			return true;
		}

		return false;
	}

	/**
	 * Load jQuery
	 *
	 * @return  boolean
	 */
	protected function loadJquery()
	{
		$loadJquery = isset($this->element['loadJquery']) ? true : false;

		if ($loadJquery)
		{
			JHtml::_('jquery.framework');

			return true;
		}

		return false;
	}
}
